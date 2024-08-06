import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AboutMe } from './AboutMe/AboutMe';
import { DiceRoller } from './DiceRoller/DiceRoller';
import { WeaponMaker } from './WeaponMaker/WeaponMaker';
import { DndShop } from './DnDShop/DnDShop';

// TODO: Dice roller
//      Replace "Result" and "Dice rolled" cards with new Card component
//      Reduce dice button size on desktop
// TODO: Weapon <aker
//      Replace card with Card component
//      Add an icon for the Generate weapon button
//      Update Generate weapon button to use Button Component
//      Update button colour to be blue.
//      Add a label to the dropdown.
//      Replace Dropdown library with Dropdown Component
//      Update "Properties" and "Damage" inline titles to be bold.
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
    {
        path: "/",
        element: <AboutMe />,
    },
    {
        element: <DiceRoller />,
        path: "/dice_roller",
    },
    {
        element: <WeaponMaker />,
        path: "/weapon_maker",
    },
    {
        element: <DndShop />,
        path: "/the_shop",
    },
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router}/>);
