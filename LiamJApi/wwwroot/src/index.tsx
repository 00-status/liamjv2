import { createRoot } from 'react-dom/client';
import { App } from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AboutMe } from './AboutMe/AboutMe';
import { DiceRoller } from './DiceRoller/DiceRoller';
import { WeaponMaker } from './WeaponMaker/WeaponMaker';

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find #app!');
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <AboutMe />,
        children: [
            {
                path: "about_me",
                element: <AboutMe />,
            },
            {
                path: "dice_roller",
                element: <DiceRoller />,
            },
            {
                path: "weapon_maker",
                element: <WeaponMaker />,
            },
        ]
    }
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router} />);
