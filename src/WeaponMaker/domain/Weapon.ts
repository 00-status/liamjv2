import { WeaponDamage, WeaponProperties, WeaponRange } from "./domain";

export class Weapon {
    private name: string;
    private baseDamage: WeaponDamage;
    private additionalDamage: WeaponDamage | null;
    private weaponProperties: WeaponProperties[];
    private weaponRange: WeaponRange | null;
    private actions: string[];

    constructor(
        name: string,
        baseDamage: WeaponDamage,
        additionalDamage: WeaponDamage | null,
        weaponProperties: WeaponProperties[],
        weaponRange: WeaponRange | null,
        actions: string[]
    ) {
        this.name = name;
        this.baseDamage = baseDamage;
        this.additionalDamage = additionalDamage;
        this.weaponProperties = weaponProperties;
        this.weaponRange = weaponRange;
        this.actions = actions;
    }

    public getName(): string {
        return this.name;
    }

    public getBaseDamage(): WeaponDamage {
        return this.baseDamage;
    }

    public getAdditionalDamage(): WeaponDamage | null {
        return this.additionalDamage;
    }

    public getWeaponProperties(): WeaponProperties[] {
        return this.weaponProperties;
    }

    public getRange(): WeaponRange | null {
        return this.weaponRange;
    }

    public getActions(): string[] {
        return this.actions;
    }
}
