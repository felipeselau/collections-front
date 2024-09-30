import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
    <ToastContainer />
  </StrictMode>,
)
