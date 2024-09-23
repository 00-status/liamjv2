import { Button } from "../../SharedComponents/Button/Button";
import { Card } from "../../SharedComponents/Card/Card";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";
import { useGenerateWeapon } from "./useGenerateWeapon";

export const WeaponMakerV2 = () => {
    const {weapon, generateWeapon} = useGenerateWeapon();

    return <Page routes={dndRoutes} title="D&D Tools">
        <div>
            <h1>Weapon Maker</h1>
        </div>
        <div>
            {weapon && <Card title={weapon.defaultName}>
                Weapon
            </Card>}
        </div>
        <div>
            <Button onClick={generateWeapon}>
                <GearsIcon /> Generate weapon
            </Button>
        </div>
    </Page>;
};
