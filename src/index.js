
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const rootDomNode = document.getElementById('app');
const root = createRoot(rootDomNode);

root.render(<App />);
