import { WeaponDamage, WeaponProperties, WeaponRange } from "./domain";

export class WeaponBuilder {
    private name: string | null = null;
    private baseDamage: WeaponDamage | null = null;
    private additionalDamage: WeaponDamage | null = null;
    private weaponProperties: WeaponProperties[] | null = null;
    private weaponRange: WeaponRange | null = null;
    private actions: string[] | null = null;

    // addBaseWeaponProperties
    //      Probably takes in a weapon type like "bow" or sword and adds WeaponProperties accordingly
    // addBaseDamage
    // addAdditionalDamage
    // addActions
    // addName
    // validate
    //      Private method
    //      Verifies that all required properties are set prior to instantiation.
    // buildWeapon
    //      Calls validate
    //      Returns a weapon object.
}
