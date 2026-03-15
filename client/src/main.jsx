import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContxt.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';
console.log("Main entry point loaded");

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
)
console.log("Main entry point rendered");
