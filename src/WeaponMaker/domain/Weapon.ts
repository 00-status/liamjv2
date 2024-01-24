import { DiceType, WeaponProperties } from "./domain";

class Weapon {
    private name: string;
    private diceCount: string;
    private diceType: DiceType;
    private damageType: string;
    private weaponProperties: WeaponProperties[];
    private effectiveRange: number;
    private ineffectiveRange: number;
    private actions: string[];

    constructor(
        name: string,
        diceCount: string,
        diceType: DiceType,
        damageType: string,
        weaponProperties: WeaponProperties[],
        effectiveRange: number,
        ineffectiveRange: number,
        actions: string[]
    ) {
        this.name = name;
        this.diceCount = diceCount;
        this.diceType = diceType;
        this.damageType = damageType;
        this.weaponProperties = weaponProperties;
        this.effectiveRange = effectiveRange;
        this.ineffectiveRange = ineffectiveRange;
        this.actions = actions;
    }
}
