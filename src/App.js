import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Exercise01 from './pages/Exercise01';
import Exercise02 from './pages/Exercise02';
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/01" component={Exercise01} exact />
        <Route path="/02" component={Exercise02} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
