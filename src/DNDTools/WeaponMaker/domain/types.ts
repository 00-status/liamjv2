export type Weapon = {
    id: number;
    defaultName: string;
    name: string | null;
    rarity: string;
    properties: string[];
    baseDamage: BaseDamage;
    extraDamage: ExtraDamage;
    weaponEffect: WeaponEffect;
    effectiveRange: number;
    ineffectiveRange: number;
}

export type BaseDamage = {
    diceCount: number;
    diceType: number;
    damageType: string;
}

export type ExtraDamage = {
    diceCount: number;
    diceType: number;
    damageType: string;
}

export type WeaponEffect = {
    id: number;
    name: string;
    description: string;
    rarities: string[];
    tags: string[];
}
