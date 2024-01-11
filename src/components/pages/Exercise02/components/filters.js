import { useSearchParams } from "react-router-dom";

export default function Filters({ genres }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSelectGenre = (event) => {
        const genre = event.target.value
        const params = new URLSearchParams()
        params.set('genre', genre)
        params.set('order', searchParams.get('order'))
        setSearchParams(params)
    }

    const handleOrder = () => {
        const params = new URLSearchParams()
        params.set('order', searchParams.get('order') === 'desc' ? 'asc' : 'desc')
        params.set('genre', searchParams.get('genre') || 'All')
        setSearchParams(params)
    }

    return (
        <div className="movie-library__actions">
            <select name="genre" placeholder="Search by genre..." onChange={handleSelectGenre} value={searchParams.get('genre') || 'All'}>
                <option value={'All'}>All</option>
                {
                    genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))
                }
            </select>
            <button onClick={handleOrder}>{
                searchParams.get('order') === 'desc' ? 'Year Ascending' : 'Year Descending'
            }</button>
        </div>
    )
}