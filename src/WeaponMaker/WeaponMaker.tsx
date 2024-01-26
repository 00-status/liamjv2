import { ReactElement, useState } from "react";
import { Page } from "../SharedComponents/Page/Page";
import { createWeapon } from "./WeaponDirector";

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

    return <Page title="Weapon Maker">
        <div>
            <h1>Weapon Maker</h1>
            <div>
                <h2>{weapon.getName()}</h2>
                <div>{baseDamage.diceCount}d{baseDamage.diceType} + {baseDamage.damageType}</div>
                <div>{additionalDamage?.diceCount}d{additionalDamage?.diceType} + {additionalDamage?.damageType}</div>
                <div>{weapon.getWeaponProperties().toString()}</div>
                <div>{weapon.getActions().map((action) => <div>{action}</div>)}</div>
            </div>
            <button onClick={() => setWeapon(createWeapon())} >Generate weapon button</button>
        </div>
    </Page>;
};
