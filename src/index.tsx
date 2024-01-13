import { createRoot } from 'react-dom/client';
import { App } from './App';

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find App!');
}

const root = createRoot(rootDomNode);
root.render(<App />);
