import { useNavigate } from "react-router-dom";

import { Page } from "../../SharedComponents/Page/Page";
import { useFetchWeaponEffect } from "./useFetchWeaponEffect";

export const WeaponEffectList = () => {
    const weaponEffects = useFetchWeaponEffect();
    const navigate = useNavigate();

    return <Page title="Weapon Effects" routes={[{label: "Landing", route: "/", isHomeLink: true}]}>
        <div>
            <h1>Weapon Effect List</h1>
            <div>
                {weaponEffects.map((weaponEffect) => <div key={weaponEffect.name} >{weaponEffect.name}</div>)}
            </div>
        </div>
    </Page>
};
