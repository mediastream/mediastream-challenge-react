import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Exercise01 from './components/pages/Exercise01';
import Exercise02 from './components/pages/Exercise02';
import Home from './components/pages/Home';

function App() {
	const routers = createBrowserRouter([
		{ path: '/', element: <Home /> },
		{ path: '/exercise01', element: <Exercise01 /> },
		{ path: '/exercise02', element: <Exercise02 /> },
	]);
	return <RouterProvider router={routers} />;
}

export default App;
