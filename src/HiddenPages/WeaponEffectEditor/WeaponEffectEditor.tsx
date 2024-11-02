import { Page } from "../../SharedComponents/Page/Page";
import { useFetchWeaponEffect } from "../WeaponEffectList/useFetchWeaponEffect";
import { WeaponEffectForm } from "./WeaponEffectForm";

export const WeaponEffectEditor = () => {
    // TODO: Fetch only the weapon effect in question.
    const weaponEffects = useFetchWeaponEffect();

    const weaponEffectToEdit = weaponEffects.find(weaponEffect => weaponEffect.id === 10);

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
