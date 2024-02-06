import { ReactElement, useState } from "react";
import Select from "react-select";

import './weapon-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { createWeapon } from "./domain/WeaponDirector";
import { Rarity, WeaponDamage } from "./domain/domain";

const rarityOptions = [
    { label: 'Uncommon', value: Rarity.Uncommon },
    { label: 'Rare', value: Rarity.Rare },
    { label: 'Very Rare', value: Rarity.VeryRare },
    { label: 'Legendary', value: Rarity.Legendary },
];

export const WeaponMaker = (): ReactElement => {
    const [selectedRarity, setSelectedRarity] = useState(rarityOptions[0]);

    const [weapon, setWeapon] = useState(createWeapon());

    const baseDamage = weapon.getBaseDamage();
    const additionalDamage = weapon.getAdditionalDamage();

    const formattedWeaponProperties = formatWeaponProperties(weapon.getWeaponProperties());

    return <Page title="Liam Johnson">
        <div className="weapon-maker">
            <h1>Weapon Maker</h1>
            <div className="weapon-maker--title">
                <Select
                    onChange={(value) => {
                        if (!value) {
                            return;
                        }

                        return setSelectedRarity(value);
                    }}
                    options={rarityOptions}
                    value={selectedRarity}
                />
                <button className="weapon-maker--button" onClick={() => setWeapon(createWeapon())}>
                    Generate weapon
                </button>
            </div>
            <div className="weapon-maker--weapon">
                <h2>{weapon.getName()}</h2>
                <div>{weapon.getRarity()}</div>
                {formattedWeaponProperties && <div>Properties: {formattedWeaponProperties}</div>}
                <div className="weapon-maker--damage">
                    Damage: {formatDamage(baseDamage)} + {formatDamage(additionalDamage)}
                </div>
                <hr className="divider" />
                <div>{weapon.getActions().map((action) => <p key={action}>{action}</p>)}</div>
            </div>
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
