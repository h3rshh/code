//import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import AppProvider from "./context/AppProvider.tsx"
import "@/styles/global.css"

// Register the service worker for background sync
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppProvider>
        <App />
    </AppProvider>
);