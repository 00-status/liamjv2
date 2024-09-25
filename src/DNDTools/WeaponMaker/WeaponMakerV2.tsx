
import './weapon-maker.css';
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";
import { useGenerateWeapon } from "./useGenerateWeapon";
import { WeaponCard } from './WeaponCard';

// ToDo:
//      Generate Form
//          Add filters above the generate weapon button.
//          After the weapon loads, the "Generate Weapon" button should slide up to make room for the weapon card.
//          Add rising sparkles when a user hovers their cursor over the button.
//          Consider adding a fancy, filigre border to the generate weapon button. 
//          Add a dropdown, so the user can pick the rarity level of their weapon.
//          Add a dropdown, so the user can pick the weapon type of their weapon.
//          Disable the "generate weapon" button while the API request is happening (and perhaps for some time after).
//      Weapon Card
//          Add more interesting colours to the Weapon Card component.
//          Consider adding icons to represent weapon rarities.
//          Have a slick animation play to indicate loading is happening.
//      General
//          Make a more friendly name for the weapon generator.
//          Add AI disclaimer to the footer.

export const WeaponMakerV2 = () => {
    const {weapon, generateWeapon} = useGenerateWeapon();

    return <Page routes={dndRoutes} title="D&D Tools">
        <div className='weapon-maker'>
            <div>
                <h1>Weapon Maker</h1>
            </div>
            <div className="weapon-maker__button">
                <Button hasSheen onClick={generateWeapon}>
                    <GearsIcon /> Generate weapon
                </Button>
            </div>
            <div>
                {weapon && <WeaponCard weapon={weapon} />}
            </div>
        </div>
    </Page>;
};
