import { Button } from "../../SharedComponents/Button/Button";
import { Card } from "../../SharedComponents/Card/Card";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";

export const WeaponMakerV2 = () => {
    return <Page routes={dndRoutes} title="D&D Tools">
        <div>
            <h1>Weapon Maker</h1>
        </div>
        <div>
            <Card title="Weapon">
                Weapon
            </Card>
        </div>
        <div>
            <Button>
                <GearsIcon /> Generate weapon
            </Button>
        </div>
    </Page>;
};
