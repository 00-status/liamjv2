import { ReactElement, useState } from "react";

import './weapon-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { createWeapon } from "./domain/WeaponDirector";
import { WeaponDamage } from "./domain/domain";

export const WeaponMaker = (): ReactElement | null => {
    const [weapon, setWeapon] = useState(createWeapon());

    const baseDamage = weapon.getBaseDamage();
    const additionalDamage = weapon.getAdditionalDamage();

    const formattedWeaponProperties = formatWeaponProperties(weapon.getWeaponProperties());

    return <Page title="Liam Johnson">
        <div className="weapon-maker">
            <div className="weapon-maker--title">
                <h1>Weapon Maker</h1>
                <button className="weapon-maker--button" onClick={() => setWeapon(createWeapon())}>
                    Generate weapon
                </button>
            </div>
            <div className="weapon-maker--weapon">
                <h2>{weapon.getName()}</h2>
                {formattedWeaponProperties && <div>Properties: {formattedWeaponProperties}</div>}
                <div className="weapon-maker--damage">
                    Damage: {formatDamage(baseDamage)} + {formatDamage(additionalDamage)}
                </div>
                <hr className="divider" />
                <div>{weapon.getActions().map((action) => <p>{action}</p>)}</div>
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
