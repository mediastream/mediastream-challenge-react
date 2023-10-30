import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MoviesShop from '@pages/MoviesShop';
import MovieLibrary from '@pages/MovieLibrary';
import Home from '@pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movies-shop" component={MoviesShop} exact />
        <Route path="/movie-library" component={MovieLibrary} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
