import { renderHook } from "@testing-library/react";
import { createWeapon } from "./WeaponDirector";
import { DamageType, DiceType, baseWeapons, damageTypes, diceTypes } from "./domain";

describe('WeaponDirector', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.00);
    });

    it('should generate a weapon completely randomly', () => {
        const { result } = renderHook(createWeapon);

        expect(result.current.getName()).toEqual('Battleaxe');
        expect(result.current.getBaseDamage()).toEqual(baseWeapons[0].damage);
        expect(result.current.getWeaponProperties()).toEqual(baseWeapons[0].properties);
        expect(result.current.getAdditionalDamage()).toEqual({
            diceCount: 1,
            diceType: DiceType.four,
            damageType: DamageType.Acid
        });
        expect(result.current.getActions()).toEqual(['This weapon can be thrown up to 60ft. On impact, it explodes in a 20ft radius. Each Creature within range must make a DC 15 Dexterity Saving Throw or take 8d6 Fire Damage. The weapon is destroyed when used in this way']);
    });
});
