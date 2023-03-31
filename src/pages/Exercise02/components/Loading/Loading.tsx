import React from 'react';

const Loading = ({ fetchCount }: any) => {
  return (
    <div className="movie-library__loading">
      <p>Loading...</p>
      <br />
      <p>Fetched {fetchCount} times</p>
    </div>
  );
};

export default Loading;
