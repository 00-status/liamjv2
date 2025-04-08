import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { gtag, initDataLayer, install } from 'ga-gtag';
import "@react-sigma/core/lib/style.css";

import { AboutMe } from './AboutMe/AboutMe';
import { DiceRoller } from './DNDTools/DiceRoller/DiceRoller';
import { DndShop } from './DNDTools/DnDShop/DnDShop';
import { DialogueTreeMaker } from './RPGTools/DialogueTreeMaker/DialogueTreeMaker';
import { CharacterMaker } from './RPGTools/CharacterMaker/CharacterMaker';
import { NotFoundPage } from './ErrorStates/NotFoundPage';
import { TerminalPage } from './Terminal/TerminalPage';
import { WeaponMaker } from './DNDTools/WeaponMaker/WeaponMaker';
import { WeaponEffectList } from './HiddenPages/WeaponEffectEditor/WeaponEffectList';
import { TerminalEditorPage } from './HiddenPages/TerminalEditor/TerminalEditorPage';
import { TreePreviewPage } from './RPGTools/TreePreview/TreePreviewPage';
import { RouterErrorBoundary } from './ErrorStates/ErrorBoundary';

initDataLayer();
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
});
install('G-G0XWWY99FC', { 'anonymize_ip': true, 'send_page_view': false });

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find App!');
}

const router = createBrowserRouter([
    { path: "/", element: <AboutMe />, ErrorBoundary: RouterErrorBoundary },
    {
        path: "/dnd_tools/",
        children: [
            { path: "", element: <DiceRoller /> },
            { path: "dice_roller", element: <DiceRoller /> },
            { path: "weapon_maker", element: <WeaponMaker /> },
            { path: "the_shop", element: <DndShop /> }
        ],
        ErrorBoundary: RouterErrorBoundary
    },
    {
        path: "/rpg_tools/",
        children: [
            { path: "", element: <DialogueTreeMaker /> },
            { path: "dialogue_tree", element: <DialogueTreeMaker /> },
            { path: "characters", element: <CharacterMaker /> },
            { path: "tree_preview", element: <TreePreviewPage /> }
        ],
        ErrorBoundary: RouterErrorBoundary
    },
    { path: "/terminal", element: <TerminalPage />, ErrorBoundary: RouterErrorBoundary},
    { path: "/unlisted/weapon_effects", element: <WeaponEffectList />, ErrorBoundary: RouterErrorBoundary},
    { path: "/unlisted/terminal_editor", element: <TerminalEditorPage />, ErrorBoundary: RouterErrorBoundary},
    { path: '*', element: <NotFoundPage />, ErrorBoundary: RouterErrorBoundary }
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router}/>);
