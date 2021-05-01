import './App.css'
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom'
import Home from './components/home'
import Cart from './components/cart'
import Sort from './components/sort'

function App() {
  return (
    <div>
      <h1>我是主组件</h1>

      <Link to="./home">首页</Link>
      <NavLink to="./home" activeClassName='selected'>首页</NavLink>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/sort" component={Sort}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </div>
  )
}

export default App
