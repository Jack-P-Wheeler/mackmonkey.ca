import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { StoreProvider } from './StoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  // </React.StrictMode>,
)
