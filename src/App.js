import Exercise01 from './components/pages/Exercise01';
import Exercise02 from './components/pages/Exercise02';
import Home from './components/pages/Home';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { exercise02Loader } from './services';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/01',
    element: <Exercise01 />,
  },
  {
    path: '/02',
    loader: exercise02Loader,
    element: <Exercise02 />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
