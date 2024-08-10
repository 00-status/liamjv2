import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "@react-sigma/core/lib/react-sigma.min.css";

import { AboutMe } from './AboutMe/AboutMe';
import { DiceRoller } from './DNDTools/DiceRoller/DiceRoller';
import { WeaponMaker } from './DNDTools/WeaponMaker/WeaponMaker';
import { DndShop } from './DNDTools/DnDShop/DnDShop';
import { DialogueTreeMaker } from './RPGTools/DialogueTreeMaker/DialogueTreeMaker';
import { CharacterMaker } from './RPGTools/CharacterMaker/CharacterMaker';

// TODO: Make the mobile view of the Weapon Maker look nicer.
// TODO: Update node packages
// TODO: Navigation
//      Create routes for each project.
//          That is, /rpg_tools/dialogue_tree or /dnd_tools/dice_roller
//      Convert the main navigation to route to each project.
//          So, the main nav would be "RPG Tools" and "D&D Tools"
//      Add a back button to each project's navigation.
//      Create a 404 page.

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find App!');
}

const router = createBrowserRouter([
    { path: "/", element: <AboutMe /> },
    { path: "/dnd_tools/dice_roller", element: <DiceRoller /> },
    { path: "/dnd_tools/weapon_maker", element: <WeaponMaker /> },
    { path: "/dnd_tools/the_shop", element: <DndShop /> },
    { path: "/rpg_tools/dialogue_tree", element: <DialogueTreeMaker /> },
    { path: "/rpg_tools/characters", element: <CharacterMaker /> },
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router}/>);
