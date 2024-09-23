import { Button } from "../../SharedComponents/Button/Button";
import { Card } from "../../SharedComponents/Card/Card";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";

export type Weapon = {
    id: number;
    defaultName: string;
    name: string | null;
    rarity: string;
    properties: string[];
    baseDamage: BaseDamage;
    extraDamage: ExtraDamage;
    weaponEffect: WeaponEffect;
    effectiveRange: number;
    ineffectiveRange: number;
}

export type BaseDamage = {
    diceCount: number;
    diceType: number;
    damageType: string;
}

export type ExtraDamage = {
    diceCount: number;
    diceType: number;
    damageType: string;
}

export type WeaponEffect = {
    id: number;
    name: string;
    description: string;
    rarities: string[];
    tags: string[];
}

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
