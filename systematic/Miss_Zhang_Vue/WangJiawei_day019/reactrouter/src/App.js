import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Index from './pages/index'
import List from './pages/list'
import Play from './pages/play'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/list/:id" component={List}></Route>
        <Route path="/play" component={Play}></Route>
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  )
}

export default App
