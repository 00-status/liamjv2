import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './region-template-editor.css';
import { Page } from '../../SharedComponents/Page/Page';
import { TextInput } from '../../SharedComponents/TextInput/TextInput';
import { Button, ButtonTheme } from '../../SharedComponents/Button/Button';

import { useRegionTemplates, TileTemplate } from './hooks/useRegionTemplates';

const PALETTE_OPTIONS = [
    { label: 'Prairie', type: 'Prairie' },
    { label: 'Woodland', type: 'Woodland' },
    { label: 'Mountain', type: 'Mountain' },
    { label: 'Hills', type: 'Hills' },
    { label: 'Wetland', type: 'Wetland' },
    { label: 'Water', type: 'Water' },
    { label: 'Empty', type: 'Empty' },
];

export const RegionTemplateEditorPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editingIdStr = searchParams.get('id');
    const editingId = editingIdStr ? parseInt(editingIdStr, 10) : null;

    const { isLoading, templates, fetchTemplates, createTemplate, updateTemplate } =
        useRegionTemplates();

    const [templateName, setTemplateName] = useState<string>('');
    const [gridWidth, setGridWidth] = useState<number>(10);
    const [gridHeight, setGridHeight] = useState<number>(10);
    const [paintedTiles, setPaintedTiles] = useState<{ [key: string]: string }>({});
    const [selectedTileType, setSelectedTileType] = useState<string>('Prairie');
    const [isPainting, setIsPainting] = useState<boolean>(false);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    useEffect(() => {
        if (editingId !== null && templates.length > 0) {
            const template = templates.find((template) => template.id === editingId);

            if (!template) {
                return;
            }

            setTemplateName(template.name);

            // Determine maximum coordinates to auto-resize canvas
            let maxX = 9; // default 10 columns
            let maxY = 9; // default 10 rows
            const loadedTiles: { [key: string]: string } = {};

            template.tile_templates.forEach((tile) => {
                loadedTiles[`${tile.x}-${tile.y}`] = tile.type;
                if (tile.x > maxX) maxX = tile.x;
                if (tile.y > maxY) maxY = tile.y;
            });

            setGridWidth(maxX + 1);
            setGridHeight(maxY + 1);
            setPaintedTiles(loadedTiles);
        }
    }, [editingId, templates]);

    const handleCellAction = useCallback(
        (x: number, y: number) => {
            setPaintedTiles((prev) => {
                const updated = { ...prev };
                const key = `${x}-${y}`;

                if (selectedTileType === 'Empty') {
                    delete updated[key];
                } else {
                    updated[key] = selectedTileType;
                }

                return updated;
            });
        },
        [selectedTileType],
    );

    // Handle mouse events for painting
    const handleMouseDown = (x: number, y: number) => {
        setIsPainting(true);
        handleCellAction(x, y);
    };

    const handleMouseEnter = (x: number, y: number) => {
        if (isPainting) {
            handleCellAction(x, y);
        }
    };

    const handleMouseUp = () => {
        setIsPainting(false);
    };

    const handleSubmit = () => {
        if (!templateName.trim()) {
            alert('Please provide a name for the Region Template!');
            return;
        }

        // Filter and construct TileTemplate items that are strictly within the dimensions and not "Empty"
        const finalTileTemplates: Array<TileTemplate> = [];

        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const key = `${x}-${y}`;
                const type = paintedTiles[key];

                if (type && type !== 'Empty') {
                    finalTileTemplates.push({
                        x,
                        y,
                        type,
                    });
                }
            }
        }

        const navigateBack = () => {
            navigate('/unlisted/region_templates');
        };

        if (editingId !== null) {
            updateTemplate(editingId, templateName, finalTileTemplates, navigateBack);
        } else {
            createTemplate(templateName, finalTileTemplates, navigateBack);
        }
    };

    const handleCancel = () => {
        navigate('/unlisted/region_templates');
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear the entire canvas grid?')) {
            setPaintedTiles({});
        }
    };

    // Grid columns styles
    const gridStyles = useMemo(() => {
        return {
            gridTemplateColumns: `repeat(${gridWidth}, 32px)`,
            gridTemplateRows: `repeat(${gridHeight}, 32px)`,
        };
    }, [gridWidth, gridHeight]);

    // Render cells in row-major order
    const cells = useMemo(() => {
        const result = [];
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const key = `${x}-${y}`;
                const type = paintedTiles[key] ?? 'Empty';
                result.push({ x, y, key, type });
            }
        }
        return result;
    }, [gridWidth, gridHeight, paintedTiles]);

    return (
        <Page
            title={editingId !== null ? `Edit Template #${editingId}` : 'Create Region Template'}
            routes={[]}
        >
            <div
                className="region-template-editor"
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="region-template-editor__header">
                    <h1>Canvas Editor</h1>
                    <div>
                        <Button buttonTheme={ButtonTheme.Subtle} onClick={handleCancel}>
                            Back to Directory
                        </Button>
                    </div>
                </div>

                <div className="region-template-editor__container">
                    {/* Sidebar controls */}
                    <div className="region-template-editor__sidebar">
                        <div>
                            <h3 className="region-template-editor__sidebar-title">Metadata</h3>
                            <TextInput
                                label="Template Name"
                                placeholder="Enter blueprint name..."
                                value={templateName}
                                onChange={(val) => setTemplateName(val || '')}
                            />
                        </div>

                        <div>
                            <h3 className="region-template-editor__sidebar-title">
                                Grid Dimensions
                            </h3>
                            <div className="region-template-editor__dimensions">
                                <div>
                                    <span
                                        style={{
                                            fontSize: '0.85rem',
                                            color: '#b0b0b0',
                                            display: 'block',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Columns (X)
                                    </span>
                                    <div className="region-template-editor__dim-control">
                                        <Button
                                            buttonTheme={ButtonTheme.Subtle}
                                            disabled={gridWidth <= 3}
                                            onClick={() => setGridWidth((w) => Math.max(3, w - 1))}
                                        >
                                            -
                                        </Button>
                                        <span className="region-template-editor__dim-value">
                                            {gridWidth}
                                        </span>
                                        <Button
                                            buttonTheme={ButtonTheme.Subtle}
                                            disabled={gridWidth >= 30}
                                            onClick={() => setGridWidth((w) => Math.min(30, w + 1))}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <span
                                        style={{
                                            fontSize: '0.85rem',
                                            color: '#b0b0b0',
                                            display: 'block',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Rows (Y)
                                    </span>
                                    <div className="region-template-editor__dim-control">
                                        <Button
                                            buttonTheme={ButtonTheme.Subtle}
                                            disabled={gridHeight <= 3}
                                            onClick={() => setGridHeight((h) => Math.max(3, h - 1))}
                                        >
                                            -
                                        </Button>
                                        <span className="region-template-editor__dim-value">
                                            {gridHeight}
                                        </span>
                                        <Button
                                            buttonTheme={ButtonTheme.Subtle}
                                            disabled={gridHeight >= 30}
                                            onClick={() =>
                                                setGridHeight((h) => Math.min(30, h + 1))
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="region-template-editor__sidebar-title">Terrain Brush</h3>
                            <div className="region-template-editor__palette">
                                {PALETTE_OPTIONS.map((opt) => (
                                    <div
                                        key={opt.type}
                                        className={`region-template-editor__palette-item ${
                                            selectedTileType === opt.type
                                                ? 'region-template-editor__palette-item--active'
                                                : ''
                                        }`}
                                        onClick={() => setSelectedTileType(opt.type)}
                                    >
                                        <div
                                            className={`region-template-editor__tile-preview tile--${opt.type.toLowerCase()}`}
                                        />
                                        <span className="region-template-editor__palette-label">
                                            {opt.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="region-template-editor__actions">
                            <Button buttonTheme={ButtonTheme.Delete} onClick={handleClear}>
                                Clear Grid
                            </Button>
                            <Button
                                buttonTheme={ButtonTheme.Default}
                                hasSheen
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {editingId !== null ? 'Save Changes' : 'Submit Template'}
                            </Button>
                        </div>
                    </div>

                    {/* Editor interactive canvas */}
                    <div className="region-template-editor__canvas-section">
                        <h3 className="region-template-editor__sidebar-title">
                            Interactive Painter Canvas
                        </h3>
                        <div className="region-template-editor__canvas-scroll">
                            <div className="region-template-editor__grid" style={gridStyles}>
                                {cells.map((cell) => (
                                    <div
                                        key={cell.key}
                                        className={`region-template-editor__cell tile--${cell.type.toLowerCase()}`}
                                        onMouseDown={() => handleMouseDown(cell.x, cell.y)}
                                        onMouseEnter={() => handleMouseEnter(cell.x, cell.y)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default RegionTemplateEditorPage;
