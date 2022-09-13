import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Exercise01 from './components/pages/Exercise01';
import Exercise02 from './components/pages/Exercise02';
import Home from './components/pages/Home'

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
