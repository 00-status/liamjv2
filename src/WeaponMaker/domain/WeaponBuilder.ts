import { DiceType, WeaponProperties } from "./domain";

class Weapon {
    private name: null | string = null;
    private diceCount: null | string = null;
    private diceType: null | DiceType = null;
    private damageType: null | string = null;
    private weaponProperties: null | WeaponProperties[] = null;
    private effectiveRange: null | number = null;
    private ineffectiveRange: null | number = null;
    private actions: null | string[] = null;

    // addName
    // addBaseProperties
    //      Probably takes in a weapon type like "bow" or sword and adds WeaponProperties accordingly
    // addDamageType
    // addDiceType
    // addDiceDamage
    // addActions
    // addName
}
