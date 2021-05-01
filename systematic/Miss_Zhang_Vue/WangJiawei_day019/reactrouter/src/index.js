import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/css/reset.css'
import './assets/js/remScale'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,

  document.getElementById('root')
)
