import { Weapon } from "./domain/Weapon";
import { WeaponBuilder } from "./domain/WeaponBuilder";
import { baseWeapons, damageTypes, diceTypes, weaponActions } from "./domain/domain";

// TODO
// Randomly select a couple actions
//      decide to pick 0-2 actions
//      Select actions
export const createWeapon = (): Weapon => {
    const baseWeapon = baseWeapons[Math.floor(Math.random() * baseWeapons.length)];
    const weaponBuilder = new WeaponBuilder();

    weaponBuilder.addName(baseWeapon.name)
        .addBaseWeaponProperties(baseWeapon.name);

    const damageType = damageTypes[Math.floor(Math.random() * damageTypes.length)];
    const diceType = diceTypes[Math.floor(Math.random() * diceTypes.length)];
    const diceCount = 1;

    weaponBuilder.addAdditionalDamage(
        {
            diceCount: diceCount,
            diceType: diceType,
            damageType: damageType
        }
    );

    const action = weaponActions[Math.floor(Math.random() * weaponActions.length)];

    weaponBuilder.addActions([action.effect]);

    return weaponBuilder.buildWeapon();
};
