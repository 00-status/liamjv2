import { renderHook } from "@testing-library/react";
import { useWeaponMaker } from "./useWeaponMaker";
import { DamageType, baseWeapons, damageTypes, diceTypes } from "./domain/domain";

describe('useWeaponMaker', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.00);
    });

    it('should generate a weapon completely randomly', () => {
        const { result } = renderHook(useWeaponMaker);

        expect(result.current.getName()).toEqual('Battleaxe');
        expect(result.current.getBaseDamage()).toEqual(baseWeapons[0].damage);
        expect(result.current.getWeaponProperties()).toEqual(baseWeapons[0].properties);
        expect(result.current.getAdditionalDamage()).toEqual({
            diceCount: 1,
            diceType: diceTypes[0],
            damageType: damageTypes[0]
        });
        expect(result.current.getActions()).toEqual([]);
    });
});
