
import './weapon-maker.css';
import { Button } from "../../SharedComponents/Button/Button";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";
import { useGenerateWeapon } from "./useGenerateWeapon";
import { WeaponCard } from './WeaponCard';

export const WeaponMakerV2 = () => {
    const {weapon, generateWeapon} = useGenerateWeapon();

    return <Page routes={dndRoutes} title="D&D Tools">
        <div className='weapon-maker'>
            <div>
                <h1>Weapon Maker</h1>
            </div>
            <div>
                {weapon && <WeaponCard weapon={weapon} />}
            </div>
            <div className="weapon-maker__button">
                <Button onClick={generateWeapon}>
                    <GearsIcon /> Generate weapon
                </Button>
            </div>
        </div>
    </Page>;
};
