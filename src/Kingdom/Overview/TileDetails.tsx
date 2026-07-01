import { Dispatch, SetStateAction, useState } from 'react';

import { Card } from '../../SharedComponents/Card/Card';
import { Button } from '../../SharedComponents/Button/Button';
import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';

import { Building, Tile } from './domain/types';

type Props = {
    tile: Tile;
    buildings: Array<Building>;
    setBuildings: Dispatch<SetStateAction<Array<Building>>>;
};

export const TileDetails = (props: Props) => {
    const { tile, buildings, setBuildings } = props;

    const [buildingName, setBuildingName] = useState<string>('');
    return (
        <Card title={tile.type}>
            <div>
                {tile.traits.length > 0 && (
                    <div>
                        <h3>Terrain Traits</h3>
                        <ul>
                            {tile.traits.map((trait) => (
                                <li key={trait}>{trait}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <div className="tile-details__buildings-form">
                    <Dropdown
                        id="modal-building-construct"
                        label="Construct Buildings"
                        defaultValue={buildingName}
                        options={buildingNames}
                        onOptionSelect={(value) => setBuildingName(value)}
                        isDisabled={buildings.length > 0}
                    />
                    <Button
                        disabled={!buildingName}
                        onClick={() => {
                            setBuildings((state) => [
                                ...state,
                                { name: buildingName, assignedTile: tile.id },
                            ]);
                            setBuildingName('');
                        }}
                    >
                        Add Building
                    </Button>
                </div>
                {buildings.length > 0 && (
                    <div>
                        <h3>Buildings</h3>
                        <ul>
                            {buildings.map((building) => (
                                <li key={building.name}>{building.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
    );
};

const buildingNames = [
    { label: '', value: '' },
    { label: 'Farm', value: 'farm' },
    { label: 'Lumber Mill', value: 'lumber_mill' },
    { label: 'Mine', value: 'mine' },
];
