import React from 'react';

import './region-template-editor-sidebar.css';
import { TextInput } from '../../../SharedComponents/TextInput/TextInput';
import { Button, ButtonTheme } from '../../../SharedComponents/Button/Button';

export const PALETTE_OPTIONS = [
    { label: 'Prairie', type: 'Prairie' },
    { label: 'Woodland', type: 'Woodland' },
    { label: 'Mountain', type: 'Mountain' },
    { label: 'Hills', type: 'Hills' },
    { label: 'Wetland', type: 'Wetland' },
    { label: 'Water', type: 'Water' },
    { label: 'Empty', type: 'Empty' },
];

export interface RegionTemplateEditorSidebarProps {
    templateName: string;
    setTemplateName: (name: string) => void;
    gridWidth: number;
    setGridWidth: React.Dispatch<React.SetStateAction<number>>;
    gridHeight: number;
    setGridHeight: React.Dispatch<React.SetStateAction<number>>;
    selectedTileType: string;
    setSelectedTileType: (type: string) => void;
    editingId: number | null;
    isLoading: boolean;
    onClear: () => void;
    onSubmit: () => void;
}

export const RegionTemplateEditorSidebar: React.FC<RegionTemplateEditorSidebarProps> = ({
    templateName,
    setTemplateName,
    gridWidth,
    setGridWidth,
    gridHeight,
    setGridHeight,
    selectedTileType,
    setSelectedTileType,
    editingId,
    isLoading,
    onClear,
    onSubmit,
}) => {
    return (
        <div className="region-template-editor-sidebar">
            <div>
                <h3 className="region-template-editor-sidebar__title">Metadata</h3>
                <TextInput
                    label="Template Name"
                    placeholder="Enter blueprint name..."
                    value={templateName}
                    onChange={(val) => setTemplateName(val || '')}
                />
            </div>

            <div>
                <h3 className="region-template-editor-sidebar__title">Grid Dimensions</h3>
                <div className="region-template-editor-sidebar__dimensions">
                    <div>
                        <span className="region-template-editor-sidebar__dim-label">
                            Columns (X)
                        </span>
                        <div className="region-template-editor-sidebar__dim-control">
                            <Button
                                buttonTheme={ButtonTheme.Subtle}
                                disabled={gridWidth <= 3}
                                onClick={() => setGridWidth((w) => Math.max(3, w - 1))}
                            >
                                -
                            </Button>
                            <span className="region-template-editor-sidebar__dim-value">
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
                        <span className="region-template-editor-sidebar__dim-label">Rows (Y)</span>
                        <div className="region-template-editor-sidebar__dim-control">
                            <Button
                                buttonTheme={ButtonTheme.Subtle}
                                disabled={gridHeight <= 3}
                                onClick={() => setGridHeight((h) => Math.max(3, h - 1))}
                            >
                                -
                            </Button>
                            <span className="region-template-editor-sidebar__dim-value">
                                {gridHeight}
                            </span>
                            <Button
                                buttonTheme={ButtonTheme.Subtle}
                                disabled={gridHeight >= 30}
                                onClick={() => setGridHeight((h) => Math.min(30, h + 1))}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="region-template-editor-sidebar__title">Terrain Brush</h3>
                <div className="region-template-editor-sidebar__palette">
                    {PALETTE_OPTIONS.map((opt) => (
                        <div
                            key={opt.type}
                            className={`region-template-editor-sidebar__palette-item ${
                                selectedTileType === opt.type
                                    ? 'region-template-editor-sidebar__palette-item--active'
                                    : ''
                            }`}
                            onClick={() => setSelectedTileType(opt.type)}
                        >
                            <div
                                className={`region-template-editor-sidebar__tile-preview tile--${opt.type.toLowerCase()}`}
                            />
                            <span className="region-template-editor-sidebar__palette-label">
                                {opt.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="region-template-editor-sidebar__actions">
                <Button buttonTheme={ButtonTheme.Delete} onClick={onClear}>
                    Clear Grid
                </Button>
                <Button
                    buttonTheme={ButtonTheme.Default}
                    hasSheen
                    onClick={onSubmit}
                    disabled={isLoading}
                >
                    {editingId !== null ? 'Save Changes' : 'Submit Template'}
                </Button>
            </div>
        </div>
    );
};
