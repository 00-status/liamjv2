import { useState } from 'react';

import './weapon-maker.css';
import { Button } from "../../SharedComponents/Button/Button";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";
import { useGenerateWeapon } from "./useGenerateWeapon";
import { WeaponCard } from './WeaponCard';
import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';


// ToDo:
//      Generate Form
//          Add filters above the generate weapon button.
//              Add a dropdown, so the user can pick the rarity level of their weapon. ✅
//              Add a dropdown, so the user can pick the weapon type of their weapon.
//          After the weapon loads, the "Generate Weapon" button should slide up to make room for the weapon card.
//          Add rising sparkles when a user hovers their cursor over the button. ✅
//          Consider adding a fancy, filigre border to the generate weapon button. 
//          Disable the "generate weapon" button while the API request is happening (and perhaps for some time after).
//      Weapon Card
//          Add more interesting colours to the Weapon Card component.
//          Consider adding icons to represent weapon rarities.
//          Have a slick animation play to indicate loading is happening.
//      Content
//          Display weapon range on the card.
//      General
//          Make a more friendly name for the weapon generator.
//          Add AI disclaimer to the footer.
//          Fix API error: Candidate was missing "content" property.

export const WeaponMakerV2 = () => {
    const [selectedRarity, setSelectedRarity] = useState<string>("Uncommon");

    const {weapon, generateWeapon} = useGenerateWeapon();

    const rarities = [
        {value: "Uncommon", label: "Uncommon"},
        {value: "Rare", label: "Rare"},
        {value: "Very Rare", label: "Very Rare"},
        {value: "Legendary", label: "Legendary"},
    ];

    return <Page routes={dndRoutes} title="D&D Tools">
        <div className='weapon-maker'>
            <div>
                <h1>Weapon Maker</h1>
            </div>
            <div className='weapon-maker__filters'>
                <div className='weapon-maker__dropdown'>
                    <Dropdown defaultValue="Uncommon" options={rarities}
                        onOptionSelect={(option) => {
                            if (option) {
                                setSelectedRarity(option);
                            }
                        }}
                    />
                </div>
                <div className="weapon-maker__button">
                    <Button hasSheen onClick={() => generateWeapon(selectedRarity)}>
                        <GearsIcon /> Generate weapon
                    </Button>
                </div>
            </div>
            <div>
                {weapon && <WeaponCard weapon={weapon} />}
            </div>
        </div>
    </Page>;
};
