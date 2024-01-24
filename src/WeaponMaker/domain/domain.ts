
export enum WeaponProperties {
    Finesse = 'Finesse',
    Loading = 'Loading',
    Light = 'Light',
    Reach = 'Reach',
    Thrown = 'Thrown',
    Twohanded = 'Twohanded',
    Versatile = 'Versatile',
    Silvered = 'Silvered',
    Lance = 'Lance'
}

export type WeaponDamage = {
    diceCount: number;
    diceType: DiceType;
    damageType: DamageType;
};

export type WeaponRange = {
    effectiveRange: number;
    ineffectiveRange: number;
};

export enum DiceType {
    four = 4,
    six = 6,
    eight = 8,
    ten = 10,
    twelve = 12,
    twenty = 20
};

export enum DamageType {
    Acid = 'Acid',
    Bludgeoning = 'Bludgeoning',
    Cold = 'Cold',
    Fire = 'Fire',
    Force = 'Force',
    Lightning = 'Lightning',
    Necrotic = 'Necrotic',
    Piercing = 'Piercing',
    Poison = 'Poison',
    Psychic = 'Psychic',
    Radiant = 'Radiant',
    Slashing = 'Slashing',
    Thunder = 'Thunder'
};
