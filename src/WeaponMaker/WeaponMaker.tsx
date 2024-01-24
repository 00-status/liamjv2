import { ReactElement } from "react";
import { Page } from "../SharedComponents/Page/Page";

export const WeaponMaker = (): ReactElement => {
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


    return <Page title="Weapon Maker">
        <div>
            <h1>Weapon Maker</h1>
            <div>Weapon container Card</div>
            <button>Generate weapon button</button>
        </div>
    </Page>;
};
