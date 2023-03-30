import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const Shop = lazy(() => import('./pages/Shop'));

const Loading = () => {
  return <div />;
};

const NoMatch = () => {
  return <div>No Match</div>;
};

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="movies"
        element={
          <Suspense fallback={<Loading />}>
            <Movies />
          </Suspense>
        }
      />
      <Route
        path="shop"
        element={
          <Suspense>
            <Shop />
          </Suspense>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default Router;
