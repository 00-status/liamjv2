import { useEffect, useState } from "react";

import { WeaponEffect } from "../WeaponMaker/WeaponEffectForm";

export const useFetchWeaponEffect = (): Array<WeaponEffect> => {
    const [weaponEffects, setWeaponEffects] = useState([]);

    useEffect(() => {
        fetch("/api/1/weapon_effects")
            .then(response => response.json())
            .then(json => setWeaponEffects(json));
    }, []);
    
    return weaponEffects;
};
