
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

export const diceTypes = [
    DiceType.four,
    DiceType.six,
    DiceType.eight,
    DiceType.ten,
    DiceType.twelve,
    DiceType.twenty
];

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

export const damageTypes: DamageType[] = [
    DamageType.Acid,
    DamageType.Bludgeoning,
    DamageType.Cold,
    DamageType.Fire,
    DamageType.Force,
    DamageType.Lightning,
    DamageType.Necrotic,
    DamageType.Piercing,
    DamageType.Poison,
    DamageType.Psychic,
    DamageType.Radiant,
    DamageType.Slashing,
    DamageType.Thunder
];

export const baseWeapons: { name: string, damage: WeaponDamage, properties: WeaponProperties[] }[] = [
    { name: 'Battleaxe', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Slashing }, properties: [WeaponProperties.Versatile] },
    { name: 'Flail', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Bludgeoning }, properties: [] },
    { name: 'Glaive', damage: { diceCount: 1, diceType: 10, damageType: DamageType.Slashing }, properties: [WeaponProperties.Reach, WeaponProperties.Twohanded] },
    { name: 'Greataxe', damage: { diceCount: 1, diceType: 12, damageType: DamageType.Slashing }, properties: [WeaponProperties.Twohanded] },
    { name: 'Greatsword', damage: { diceCount: 2, diceType: 6, damageType: DamageType.Slashing }, properties: [WeaponProperties.Twohanded] },
    { name: 'Halberd', damage: { diceCount: 1, diceType: 10, damageType: DamageType.Slashing }, properties: [WeaponProperties.Reach, WeaponProperties.Twohanded] },
    { name: 'Lance', damage: { diceCount: 1, diceType: 12, damageType: DamageType.Piercing }, properties: [WeaponProperties.Reach, WeaponProperties.Lance] },
    { name: 'Longsword', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Slashing }, properties: [WeaponProperties.Versatile] },
    { name: 'Maul', damage: { diceCount: 2, diceType: 6, damageType: DamageType.Bludgeoning }, properties: [WeaponProperties.Twohanded] },
    { name: 'Morningstar', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Piercing }, properties: [] },
    { name: 'Pike', damage: { diceCount: 1, diceType: 10, damageType: DamageType.Piercing }, properties: [WeaponProperties.Reach, WeaponProperties.Twohanded] },
    { name: 'Rapier', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Piercing }, properties: [WeaponProperties.Finesse] },
    { name: 'Scimitar', damage: { diceCount: 1, diceType: 6, damageType: DamageType.Slashing }, properties: [WeaponProperties.Finesse, WeaponProperties.Light] },
    { name: 'Shortsword', damage: { diceCount: 1, diceType: 6, damageType: DamageType.Piercing }, properties: [WeaponProperties.Finesse, WeaponProperties.Light] },
    { name: 'Trident', damage: { diceCount: 1, diceType: 6, damageType: DamageType.Piercing }, properties: [WeaponProperties.Thrown, WeaponProperties.Versatile] },
    { name: 'War pick', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Piercing }, properties: [] },
    { name: 'Warhammer', damage: { diceCount: 1, diceType: 8, damageType: DamageType.Bludgeoning }, properties: [WeaponProperties.Versatile] },
    { name: 'Whip', damage: { diceCount: 1, diceType: 4, damageType: DamageType.Slashing }, properties: [WeaponProperties.Finesse, WeaponProperties.Reach] },
];







