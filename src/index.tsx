import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "@react-sigma/core/lib/react-sigma.min.css";

import { AboutMe } from './AboutMe/AboutMe';
import { DiceRoller } from './DNDTools/DiceRoller/DiceRoller';
import { WeaponMaker } from './DNDTools/WeaponMaker/WeaponMaker';
import { DndShop } from './DNDTools/DnDShop/DnDShop';
import { DialogueTreeMaker } from './RPGTools/DialogueTreeMaker/DialogueTreeMaker';
import { CharacterMaker } from './RPGTools/CharacterMaker/CharacterMaker';
import { NotFoundPage } from './NotFoundPage';
import { TerminalPage } from './Terminal/TerminalPage';
import { WeaponEffectForm } from './HiddenPages/WeaponMaker/WeaponEffectForm';
import { WeaponMakerV2 } from './DNDTools/WeaponMaker/WeaponMakerV2';

// TODO: WeaponGenerator
//      Create a WeaponGeneratorV2 Component
//      If the user presses a "Generate Weapon" button
//          We should call the endpoint.
//          A slick animation should play to indicate loading is happening.
//          After the weapon loads, the "Generate Weapon" button should slide down to make room for the weapon card.
//      There should be a dropdown so the user can pick the rarity level of their weapon.

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find App!');
}

const router = createBrowserRouter([
    { path: "/", element: <AboutMe /> },
    {
        path: "/dnd_tools/",
        children: [
            { path: "", element: <DiceRoller /> },
            { path: "dice_roller", element: <DiceRoller /> },
            { path: "weapon_maker", element: <WeaponMakerV2 /> },
            { path: "the_shop", element: <DndShop /> }
        ]
    },
    {
        path: "/rpg_tools/",
        children: [
            { path: "", element: <DialogueTreeMaker /> },
            { path: "dialogue_tree", element: <DialogueTreeMaker /> },
            { path: "characters", element: <CharacterMaker /> }
        ]
    },
    { path: "/terminal", element: <TerminalPage /> },
    { path: "/unlisted/weapon_effect", element: <WeaponEffectForm /> },
    { path: '*', element: <NotFoundPage /> }
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router}/>);
