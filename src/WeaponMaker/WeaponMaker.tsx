import { ReactElement, useState } from "react";
import Select, { StylesConfig } from "react-select";

import './weapon-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { createWeapon } from "./domain/WeaponDirector";
import { Rarity, WeaponDamage } from "./domain/constants";


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
    const [selectedRarity, setSelectedRarity] = useState(rarityOptions[0]);

    const [weapon, setWeapon] = useState(createWeapon(selectedRarity.value));

    const baseDamage = weapon.getBaseDamage();
    const additionalDamage = weapon.getAdditionalDamage();

    const formattedWeaponProperties = formatWeaponProperties(weapon.getWeaponProperties());

    return <Page title="Liam Johnson">
        <div className="weapon-maker">
            <h1>Weapon Maker</h1>
            <div className="weapon-maker--title">
                <Select
                    className="dropdown"
                    onChange={(value) => {
                        if (!value) {
                            return;
                        }

                        return setSelectedRarity(value);
                    }}
                    options={rarityOptions}
                    value={selectedRarity}
                    theme={(theme) => {
                        return {
                            ...theme,
                            borderRadius: 4,
                            colors: {
                                ...theme.colors,
                                primary: '#708694', // the selected option in the dropdown menu
                                primary25: '#45454a', // The color when an option is hovered
                                primary50: '#65656c', // The color when an option is picked
                                primary75: 'blue', // Unknown
                                neutral0: '#3b3b40', // background colour and selected option text color
                                neutral80: '#FCFEFF', // The text color of the input field. The colour of the dropdown icon when the component is in focus
                                neutral05: 'blue', // unknown
                                neutral10: 'blue', // Unknown
                                neutral20: '#89898b', // border colours
                                neutral30: '#89898b', // Border colour when hovered
                                neutral40: '#89898b', // Hover colour of the dropdown icon when it is not in focus.
                                neutral50: 'blue', // Unknown
                                neutral60: '#89898b', // The colour of the icon when the component is in focus, but the cursor isn't directly over top.
                                neutral70: 'blue', // Unknown
                            }
                        };
                    }}
                />
                <button className="weapon-maker--button" onClick={() => setWeapon(createWeapon(selectedRarity.value))}>
                    Generate weapon
                </button>
            </div>
            <div className="weapon-maker--weapon">
                <h2 className="weapon-maker--card-title">{weapon.getName()}</h2>
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
