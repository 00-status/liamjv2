import { ReactElement, useState } from "react";

import './weapon-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { createWeapon } from "./domain/WeaponDirector";
import { Rarity, WeaponDamage } from "./domain/constants";
import { Card } from "../SharedComponents/Card/Card";
import { Button } from "../SharedComponents/Button/Button";
import { Dropdown } from "../SharedComponents/Dropdown/Dropdown";
import { GearsIcon } from "../SharedComponents/Icons/GearsIcon";


type SelectOption<T> = {
    label: string,
    value: T
};

const rarityOptions: SelectOption<Rarity>[] = [
    { label: 'Uncommon', value: Rarity.Uncommon },
    { label: 'Rare', value: Rarity.Rare },
    { label: 'Very Rare', value: Rarity.VeryRare },
    { label: 'Legendary', value: Rarity.Legendary },
];

export const WeaponMaker = (): ReactElement => {
    const [selectedRarity, setSelectedRarity] = useState<Rarity>(rarityOptions[0].value);

    const [weapon, setWeapon] = useState(createWeapon(selectedRarity));

    const baseDamage = weapon.getBaseDamage();
    const additionalDamage = weapon.getAdditionalDamage();

    const formattedWeaponProperties = formatWeaponProperties(weapon.getWeaponProperties());

    return <Page title="Liam Johnson">
        <div className="weapon-maker">
            <h1>Weapon Maker</h1>
            <div className="weapon-maker--title">
                <Dropdown
                    label="Rarity"
                    defaultValue={selectedRarity}
                    options={rarityOptions}
                    onOptionSelect={(value) => {
                        if (Object.values(Rarity).includes(value as Rarity)) {
                            const typeCheckedRarity = value as Rarity;
                            setSelectedRarity(typeCheckedRarity);
                        }
                    }}
                />
                <Button onClick={() => setWeapon(createWeapon(selectedRarity))} >
                    <GearsIcon />
                    Generate weapon
                </Button>
            </div>
            <Card title={weapon.getName()}>
                <div>
                    {weapon.getRarity()}
                    {formattedWeaponProperties && <div>
                        <b>Properties: </b> {formattedWeaponProperties}
                    </div>}
                    <div className="weapon-maker--damage">
                        <b>Damage: </b> {formatDamage(baseDamage)} + {formatDamage(additionalDamage)}
                    </div>
                </div>
                <hr className="divider" />
                <div>
                    {weapon.getActions().map((action) => <p key={action}>{action}</p>)}
                </div>
            </Card>
        </div>
    </Page>;
};

const formatWeaponProperties = (weaponProperties: string[]): string => {
    if (weaponProperties.length <= 0) {
        return '';
    }

    return weaponProperties.join(', ');
};

const formatDamage = (damage: WeaponDamage | null): string => {
    if (!damage) {
        return '';
    }

    return damage.diceCount + 'd' + damage.diceType + ' ' + damage.damageType;
};
