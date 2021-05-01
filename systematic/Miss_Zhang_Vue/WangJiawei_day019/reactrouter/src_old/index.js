import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
/* 引入路由默认的插件 */
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,

  document.getElementById('root')
)
