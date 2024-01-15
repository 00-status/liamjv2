import { createRoot } from 'react-dom/client';
import { App } from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find #app!');
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router} />);
