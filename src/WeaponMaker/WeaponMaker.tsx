import { ReactElement } from "react";
import { Page } from "../SharedComponents/Page/Page";

export const WeaponMaker = (): ReactElement => {
    return <Page title="Weapon Maker">
        <div>
            <h1>Weapon Maker</h1>
            <div>Weapon container Card</div>
            <button>Generate weapon button</button>
        </div>
    </Page>;
};
