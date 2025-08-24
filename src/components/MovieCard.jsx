import React from 'react'
import useWatchlist from '../hooks/useWatchList'
import { Link } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const MovieCard = ({ movie }) => {

    const { state, dispatch } = useWatchlist();
    const isMovieInWatchlist = state.watchlist.some(item => item.id === movie.id);

    const toggleWatchlist = () => {
        if (isMovieInWatchlist) {
            dispatch({ type: 'REMOVE_MOVIE', payload: movie.id });
        } else {
            dispatch({ type: 'ADD_MOVIE', payload: movie });
        }
    };

    //const posterUrl = 'https://image.tmdb.org/t/p/w500/4ZRVRtDtgECAEi4HfZfYSCMtE1K.jpg'

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Poster+Available';

    return (
        <div className="movie-card">
            <div className="movie-card-poster">
                <Link to={`/movie/${movie.id}`}>
                    <img src={posterUrl} alt={movie.title} />
                </Link>
                <button onClick={toggleWatchlist} className='watchlist-btn'>
                    {isMovieInWatchlist ? <FaBookmark color="#e50914" /> : <FaRegBookmark color="#fff" />}
                </button>
            </div>
            <div className="movie-card-info">
                <h3>{movie.title}</h3>
            </div>
        </div>
    )
}

export default MovieCard
