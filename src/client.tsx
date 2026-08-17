import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { getRouter } from './router';
import './styles.css';

const router = getRouter();

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  try {
    console.log("[STARTUP] Initializing React Root");
    const root = createRoot(rootElement);
    
    console.log("[STARTUP] Rendering RouterProvider");
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
    console.log("[STARTUP] React Root rendered successfully");
  } catch (error) {
    console.error("[STARTUP ERROR] Fatal error during React initialization:", error);
    rootElement.innerHTML = `
      <div style="display:flex; height:100vh; align-items:center; justify-content:center; background:#000; color:#fff; text-align:center; padding: 20px;">
        <div>
          <h1 style="font-size:1.5rem; margin-bottom:10px;">Fatal Startup Error</h1>
          <p style="color:#aaa;">The application failed to launch. Please check your logs or network connection.</p>
          <pre style="margin-top:20px; font-size:10px; color:#f55; text-align:left; overflow:auto;">${String(error)}</pre>
        </div>
      </div>
    `;
  }
}
