import { DamageType, DiceType, WeaponDamage, WeaponProperties, WeaponRange } from "./domain";

export class Weapon {
    private name: string;
    private baseDamage: WeaponDamage;
    private additionalDamage: WeaponDamage;
    private weaponProperties: WeaponProperties[];
    private weaponRange: WeaponRange | null;
    private actions: string[];

    constructor(
        name: string,
        baseDamage: WeaponDamage,
        additionalDamage: WeaponDamage,
        weaponProperties: WeaponProperties[],
        weaponRange: WeaponRange,
        actions: string[]
    ) {
        this.name = name;
        this.baseDamage = baseDamage;
        this.additionalDamage = additionalDamage;
        this.weaponProperties = weaponProperties;
        this.weaponRange = weaponRange;
        this.actions = actions;
    }
}
