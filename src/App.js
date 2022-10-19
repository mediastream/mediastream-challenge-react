import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import MoviesComponents from './components/pages/Movies/MoviesComponents'
import ShopComponent from './components/pages/Shop/ShopComponent'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/01" component={ShopComponent} exact />
        <Route path="/02" component={MoviesComponents} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
