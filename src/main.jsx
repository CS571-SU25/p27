import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import FinanceApp from './component/structural/FinanceApp.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'


createRoot(document.getElementById('root')).render(
  <FinanceApp />
)
