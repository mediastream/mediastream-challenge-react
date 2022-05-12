const MovieList = ({ children }) => {
    return (<div className="movies__list">
        <ul>
            {children}
        </ul>
    </div>)
}

export default MovieList
