import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Exercise01 = lazy(() => import('../pages/Exercise01'));
const Exercise02 = lazy(() => import('../pages/Exercise02'));

const Loading = () => {
  return <div>Loading... </div>;
};

const NotFound = () => {
  return <h1>Not Found page</h1>;
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
        path="01"
        element={
          <Suspense fallback={<Loading />}>
            <Exercise01 />
          </Suspense>
        }
      />
      <Route
        path="02"
        element={
          <Suspense>
            <Exercise02 />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
