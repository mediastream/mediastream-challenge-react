const CardList = ({ children }) => {
    return (
        <div className="movie-library-item-container">
            <ul className="movie-library__list">
                {children}
            </ul>
        </div>
    )
}

export default CardList
