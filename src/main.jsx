import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ColorProvider } from './context/ColorContext.jsx';
import { Analytics } from '@vercel/analytics/react';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorProvider>
      <App />
      <Analytics />
    </ColorProvider>
  </StrictMode>,
);
