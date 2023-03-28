import React, { memo } from "react";

const Loader = ({ fetchCount }) => (
  <div className="movie-library__loading">
    <p>Loading...</p>
    <p>Fetched {fetchCount} times</p>
  </div>
);

export default memo(Loader);
