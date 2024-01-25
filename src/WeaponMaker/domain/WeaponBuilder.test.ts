import { WeaponBuilder } from "./WeaponBuilder";
import { DamageType, DiceType, WeaponProperties } from "./domain";

describe('WeapobBuilder', () => {
    it('should return a weapon class', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder
            .addName('Test Weapon Name')
            .addBaseWeaponProperties('Greatsword')
            .addAdditionalDamage({
                diceCount: 2,
                diceType: DiceType.eight,
                damageType: DamageType.Lightning
            })
            .addActions(['Test Action']);

        const weapon = weaponBuilder.buildWeapon();

        expect(weapon.getName()).toEqual('Test Weapon Name');
        expect(weapon.getBaseDamage()).toEqual({ diceCount: 2, diceType: DiceType.six, damageType: DamageType.Slashing });
        expect(weapon.getAdditionalDamage()).toEqual({
            diceCount: 2,
            diceType: DiceType.eight,
            damageType: DamageType.Lightning
        });
        expect(weapon.getWeaponProperties()).toEqual([WeaponProperties.Twohanded]);
        expect(weapon.getRange()).toEqual(null);
        expect(weapon.getActions()).toEqual(['Test Action']);
    });

    it('should return a weapon class when additional damage is null', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder.addName('Test Weapon Name')
            .addBaseWeaponProperties('Greatsword')
            .addActions(['Test Action']);

        const weapon = weaponBuilder.buildWeapon();

        expect(weapon.getName()).toEqual('Test Weapon Name');
        expect(weapon.getBaseDamage()).toEqual({ diceCount: 2, diceType: DiceType.six, damageType: DamageType.Slashing });
        expect(weapon.getAdditionalDamage()).toEqual(null);
        expect(weapon.getWeaponProperties()).toEqual([WeaponProperties.Twohanded]);
        expect(weapon.getRange()).toEqual(null);
        expect(weapon.getActions()).toEqual(['Test Action']);
    });

    it('should return a weapon class when Actions is empty', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder.addName('Test Weapon Name')
            .addBaseWeaponProperties('Greatsword')
            .addAdditionalDamage({
                diceCount: 2,
                diceType: DiceType.eight,
                damageType: DamageType.Lightning
            })
            .addActions([]);

        const weapon = weaponBuilder.buildWeapon();

        expect(weapon.getName()).toEqual('Test Weapon Name');
        expect(weapon.getBaseDamage()).toEqual({ diceCount: 2, diceType: DiceType.six, damageType: DamageType.Slashing });
        expect(weapon.getAdditionalDamage()).toEqual({
            diceCount: 2,
            diceType: DiceType.eight,
            damageType: DamageType.Lightning
        });
        expect(weapon.getWeaponProperties()).toEqual([WeaponProperties.Twohanded]);
        expect(weapon.getRange()).toEqual(null);
        expect(weapon.getActions()).toEqual([]);
    });

    it('should throw a TypeError when name is null', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder.addBaseWeaponProperties('Greatsword')
            .addAdditionalDamage({
                diceCount: 2,
                diceType: DiceType.eight,
                damageType: DamageType.Lightning
            })
            .addActions(['Test Action']);

        expect(() => weaponBuilder.buildWeapon()).toThrow(TypeError);
    });

    it('should throw a TypeError when baseWeaponDamage is null', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder.addName('Test Weapon Name')
            .addAdditionalDamage({
                diceCount: 2,
                diceType: DiceType.eight,
                damageType: DamageType.Lightning
            })
            .addActions(['Test Action']);

        expect(() => weaponBuilder.buildWeapon()).toThrow(TypeError);
    });

    it('should throw a TypeError when Actions is null', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder.addName('Test Weapon Name')
            .addBaseWeaponProperties('Greatsword')
            .addAdditionalDamage({
                diceCount: 2,
                diceType: DiceType.eight,
                damageType: DamageType.Lightning
            });

        expect(() => weaponBuilder.buildWeapon()).toThrow(TypeError);
    });

    it('should throw an Error when adding an invalid base weapon', () => {
        const weaponBuilder = new WeaponBuilder();

        expect(() => weaponBuilder.addBaseWeaponProperties('Banana!')).toThrow(Error);
    });
});
