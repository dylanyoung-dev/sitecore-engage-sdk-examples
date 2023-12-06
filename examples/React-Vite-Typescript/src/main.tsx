import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { EngageProvider } from './features/engageTracker/EngageProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EngageProvider>
      <App />
    </EngageProvider>
  </React.StrictMode>,
)
