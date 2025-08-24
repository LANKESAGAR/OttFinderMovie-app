import React from 'react'
import useWatchlist from '../hooks/useWatchList'
import MovieCard from '../components/MovieCard';

const WatchlistPage = () => {
    const { state } = useWatchlist();
    return (
        <div className='watchlist-page-container'>
            <h1>My Watchlist</h1>
            {state.watchlist.length === 0 ? (
                <p className="no-movies">Your watchlist is empty.</p>
            )
                : (
                    <div className="movie-grid">
                        {
                            state.watchlist.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default WatchlistPage
