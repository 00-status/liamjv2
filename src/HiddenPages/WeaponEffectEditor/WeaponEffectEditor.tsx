import { useLocation, useSearchParams } from "react-router-dom";

import { Page } from "../../SharedComponents/Page/Page";
import { useFetchWeaponEffect } from "../WeaponEffectList/useFetchWeaponEffect";
import { WeaponEffectForm } from "./WeaponEffectForm";

export const WeaponEffectEditor = () => {
    const [searchParams] = useSearchParams();
    
    // TODO: Fetch only the weapon effect in question.
    const weaponEffects = useFetchWeaponEffect();

    const key = Number(searchParams.get("id") ?? 0);
    const weaponEffectToEdit = weaponEffects.find(weaponEffect => weaponEffect.id === key);

    if (weaponEffects.length <= 0) {
        return null;
    }

    return <Page routes={[{ route: "/", isHomeLink: true, label: "Landing" }]} title="Weapon Effects">
        <div>
            <h1>Weapon Effect Form</h1>
            <WeaponEffectForm weaponEffect={weaponEffectToEdit ? weaponEffectToEdit : undefined} />
        </div>
    </Page>
};
