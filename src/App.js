import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Exercise01 from './components/pages/Exercise01';
import Exercise02 from './components/pages/Exercise02';
import Home from './components/pages/Home'


function App() {
  const routers = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/movie-store', element: <Exercise01 /> },
    { path: '/movie-library', element: <Exercise02 /> },
  ])
  return <RouterProvider router={routers} />;
}

export default App;
