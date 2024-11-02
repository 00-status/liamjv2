import { useNavigate } from "react-router-dom";

import { Page } from "../../SharedComponents/Page/Page";
import { useFetchWeaponEffect } from "./useFetchWeaponEffect";
import { WeaponEffect } from "../WeaponEffectEditor/WeaponEffectForm";

export const WeaponEffectList = () => {
    const weaponEffects = useFetchWeaponEffect();
    const navigate = useNavigate();

    const navigateToWeaponEffectForm = (weaponEffect: WeaponEffect) => {
        navigate("/unlisted/weapon_effect?id=" + (weaponEffect.id ?? 0))
    };

    return <Page title="Weapon Effects" routes={[{label: "Landing", route: "/", isHomeLink: true}]}>
        <div>
            <h1>Weapon Effect List</h1>
            <div>
                {weaponEffects.map((weaponEffect) => <div
                    onClick={() => navigateToWeaponEffectForm(weaponEffect)} key={weaponEffect.name}
                    >
                        {weaponEffect.name}
                    </div>
                )}
            </div>
        </div>
    </Page>
};
