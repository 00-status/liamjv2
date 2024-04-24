import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AboutMe } from './AboutMe/AboutMe';
import { DiceRoller } from './DiceRoller/DiceRoller';
import { WeaponMaker } from './WeaponMaker/WeaponMaker';
import { DndShop } from './DnDShop/DnDShop';

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
