import { WeaponBuilder } from "./WeaponBuilder";

describe('WeapobBuilder', () => {
    it('should return a weapon class', () => {
        const weaponBuilder = new WeaponBuilder();

        weaponBuilder.addBaseProperties();
        weaponBuilder.addBaseDamage();
        weaponBuilder.addAdditionalDamage();
        weaponBuilder.addActions();
        weaponBuilder.addName();
        weaponBuilder.buildWeapon();
    });

    it('should throw a TypeError when name is null', () => {
        
    });

    it('should throw a TypeError when diceCount is null', () => {
        
    });

    it('should throw a TypeError when diceType is null', () => {
        
    });

    it('should throw a TypeError when damageType is null', () => {
        
    });

    it('should throw a TypeError when weaponProperties is null', () => {
        
    });

    it('should throw a DomainError when weaponProperties is empty', () => {
        
    });

    it('should throw a DomainError when the effective range of weaponRange greater than the innefectiveRange', () => {
        
    });

    it('should throw a DomainError when weaponRange is not specified but the weapon has the Range property', () => {

    });

    it('should throw a TypeError when Actions is null', () => {
        
    });
});
