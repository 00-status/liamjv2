import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { gtag, initDataLayer, install } from 'ga-gtag';
import "@react-sigma/core/lib/style.css";

import { RouterErrorBoundary } from './ErrorStates/ErrorBoundary';

const AboutMe = lazy(() => import('./AboutMe/AboutMe'));
const DiceRoller = lazy(() => import('./DNDTools/DiceRoller/DiceRoller'));
const DndShop = lazy(() => import('./DNDTools/DnDShop/DnDShop'));
const DialogueTreeMaker = lazy(() => import('./RPGTools/DialogueTreeMaker/DialogueTreeMaker'));
const CharacterMaker = lazy(() => import('./RPGTools/CharacterMaker/CharacterMaker'));
const NotFoundPage = lazy(() => import('./ErrorStates/NotFoundPage'));
const TerminalPage = lazy(() => import('./Terminal/TerminalPage'));
const WeaponMaker = lazy(() => import('./DNDTools/WeaponMaker/WeaponMaker'));
const WeaponEffectList = lazy(() => import('./HiddenPages/WeaponEffectEditor/WeaponEffectList'));
const TerminalEditorPage = lazy(() => import('./HiddenPages/TerminalEditor/TerminalEditorPage'));
const TreePreviewPage = lazy(() => import('./RPGTools/TreePreview/TreePreviewPage'));

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
