import { useNavigate } from "react-router-dom";

import './weapon-effect-list.css';
import { Page } from "../../SharedComponents/Page/Page";
import { useFetchWeaponEffect } from "./useFetchWeaponEffect";
import { WeaponEffect, WeaponEffectForm } from "../WeaponEffectEditor/WeaponEffectForm";
import { useState } from "react";

export const WeaponEffectList = () => {
    const weaponEffects = useFetchWeaponEffect();

    const [currentWeaponEffect, setCurrentWeaponEffect] = useState<WeaponEffect|null>(null);

    return <Page title="Weapon Effects" routes={[{label: "Landing", route: "/", isHomeLink: true}]}>
        <div className="weapon-effect-list">
            <h1>Weapon Effect List</h1>
            <div className="weapon-effect-list__container">
                <div>
                    {weaponEffects.map((weaponEffect) => <div
                            className="weapon-effect-list__item"
                            onClick={() => setCurrentWeaponEffect(weaponEffect)}
                            key={weaponEffect.name}
                        >
                            {weaponEffect.name}
                        </div>
                    )}
                </div>
                <div>
                    <WeaponEffectForm weaponEffect={currentWeaponEffect ? currentWeaponEffect : undefined} />
                </div>
            </div>
        </div>
    </Page>
};
