import { useState } from 'react';

import './weapon-maker.css';
import { Button } from "../../SharedComponents/Button/Button";
import { GearsIcon } from "../../SharedComponents/Icons/GearsIcon";
import { Page } from "../../SharedComponents/Page/Page";
import { dndRoutes } from "../domain";
import { useGenerateWeapon } from "./useGenerateWeapon";
import { WeaponCard } from './WeaponCard';
import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';
import { Loader } from '../../SharedComponents/Loader/Loader';


// ToDo:
//      Generate Form
//          Add filters above the generate weapon button.
//              Add a dropdown, so the user can pick the rarity level of their weapon. ✅
//          Add rising sparkles when a user hovers their cursor over the button. ✅
//          Disable the "generate weapon" button while the API request is happening (and perhaps for some time after). ✅
//      Weapon Card
//          Add more interesting colours to the Weapon Card component.
//          Add a slick animation to the Weapon Card ✅
//          Have a slick animation play to indicate loading is happening. ✅
//          Add a "copy" button so the user can copy the weapon to their clipboard. 😤
//          Add the mastery ability to the weapon's Action section instead of being in the properties line.
//      Content
//          Display weapon range on the card. ✅
//      General
//          Make a more friendly name for the weapon generator. ✅
//          Add AI disclaimer to the footer. 😤

export const WeaponMaker = () => {
    const [selectedRarity, setSelectedRarity] = useState<string>("Uncommon");

    const {weapon, generateWeapon, isLoading} = useGenerateWeapon();

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
                    <Button disabled={isLoading} hasSheen onClick={() => generateWeapon(selectedRarity)}>
                        <GearsIcon /> Make weapon
                    </Button>
                </div>
            </div>
            <div>
                {isLoading && <Loader />}
                {!isLoading && weapon && <div className='weapon-maker__card'><WeaponCard weapon={weapon} /></div>}
            </div>
        </div>
    </Page>;
};
