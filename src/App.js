import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MoviesShop from '@pages/MoviesShop';
import Exercise02 from '@pages/Exercise02';
import Home from '@pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movies-shop" component={MoviesShop} exact />
        <Route path="/02" component={Exercise02} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
