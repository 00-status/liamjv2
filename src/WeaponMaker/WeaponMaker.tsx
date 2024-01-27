import { ReactElement, useState } from "react";

import './weapon-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { createWeapon } from "./WeaponDirector";
import { WeaponDamage } from "./domain/domain";

export const WeaponMaker = (): ReactElement | null => {
    // Start with a pool of points that we can spend on various "stuff"
    // Randomly select a weapon type (bow, sword, dagger, etc).
    //      Add Weapon Properties according to the weapon type chosen.
    //      Add the following accordingly
    //          The Weapon Properties
    //          The dice type
    //          The dice count
    //          The base damage type (piercing, slashing, bludgeoning)
    // Add additional damage
    //      The dice type
    //      The dice count
    //      The base damage type (piercing, slashing, bludgeoning)
    //      Deduct points based on how valuable the damage type is.
    // Add Actions
    // If there are any points left
    //      Replace the base damage with a cool, magical one.
    // Add name

    // This will probably be handled by a "Dealer" script or something of that nature,
    // which manages this score system as the weapon is generated.

    const [weapon, setWeapon] = useState(createWeapon());

    const baseDamage = weapon.getBaseDamage();
    const additionalDamage = weapon.getAdditionalDamage();

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
                {
                    weapon.getWeaponProperties().length > 0 ?
                        <div>Properties: {weapon.getWeaponProperties().toString()}</div>
                        : null
                }
                <div className="weapon-maker--damage">
                    Damage: {formatDamage(baseDamage)} + {formatDamage(additionalDamage)}
                </div>
                <hr className="divider" />
                <div>{weapon.getActions().map((action) => <p>{action}</p>)}</div>
            </div>
        </div>
    </Page>;
};

const formatDamage = (damage: WeaponDamage | null): string => {
    if (!damage) {
        return '';
    }

    return damage.diceCount + 'd' + damage.diceType + ' ' + damage.damageType;
};
