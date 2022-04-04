import React from 'react';

export const Loading = ({fetchCount}) => {
    return (
        <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
        </div>
    )
}
