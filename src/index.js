import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BreakProvider } from './Contexts/BreakProvider';
import { SessionProvider } from './Contexts/SessionProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <BreakProvider>
        <App />
      </BreakProvider>
    </SessionProvider>
  </React.StrictMode>
);

