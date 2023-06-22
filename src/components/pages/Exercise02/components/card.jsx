import {DEFAULT_CARD_IMAGE} from "../constants/index";

export default function Card ({ movie }) {
    return (
        <div className="card" style={{background: `url('${movie.posterUrl}'),url('${DEFAULT_CARD_IMAGE}')`}}>
            <div>
                <p>{movie.title}</p>
                <p>{movie.genres.join(', ')}</p>
                <p>{movie.year}</p>
            </div>
        </div>
    )
}