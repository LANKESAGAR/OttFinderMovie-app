import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchList';
import Notification from '../components/Notification';
import { getCountryName } from '../utils/countryHelpers';
import useMovieID from '../hooks/useMovieID';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { state, dispatch } = useWatchlist();
    const [showNotification, setShowNotification] = useState(false);
    const [countrySearchTerm, setCountrySearchTerm] = useState('');

    const { movie, providers, loadingProviders, videoKey } = useMovieID(id);

    useEffect(() => {
        let timer;
        if (showNotification) {
            timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showNotification]);

    const isMovieInWatchlist = movie
        ? state.watchlist.some(item => item.id === movie.id)
        : false;

    const posterUrl = movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Poster+Available';

    const handleToggleWatchlist = () => {
        if (isMovieInWatchlist) {
            dispatch({ type: 'REMOVE_MOVIE', payload: movie.id });
            setShowNotification(true);
        } else {
            dispatch({ type: 'ADD_MOVIE', payload: movie });
            setShowNotification(true);
        }
    };

    if (!movie) return <div>Loading movie details...</div>;

    const filteredCountries = providers
        ? Object.keys(providers).filter(countryCode =>
            getCountryName(countryCode)
                .toLowerCase()
                .includes(countrySearchTerm.toLowerCase())
        )
        : [];

    return (
        <div className='movie-detail-container'>
            <Notification
                message={isMovieInWatchlist ? "Added to Watchlist" : "Removed from Watchlist"}
                isVisible={showNotification}
            />

            {videoKey && (
                <div className="movie-trailer-container">
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <div className="movie-content-wrapper">
                <div className="movie-poster-section">
                    <img src={posterUrl} alt={movie.title} />
                </div>
                <div className="movie-info-section">
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <button onClick={handleToggleWatchlist} className="add-to-watchlist-btn">
                        {isMovieInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                    <div className="providers-section">
                        <h2>Available to Watch Worldwide</h2>
                        <input
                            type="text"
                            className="country-search-input"
                            placeholder="Search for a country..."
                            value={countrySearchTerm}
                            onChange={(e) => setCountrySearchTerm(e.target.value)}
                        />
                        {loadingProviders ? (
                            <div className="loading">Checking streaming availability...</div>
                        ) : providers && Object.keys(providers).length > 0 ? (
                            <div className="providers-grid">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((countryCode) => (
                                        <div key={countryCode} className="country-provider-block">
                                            <h3>{getCountryName(countryCode)}</h3>
                                            {providers[countryCode].flatrate && (
                                                <div className="provider-list-container">
                                                    <h4>Subscription:</h4>
                                                    <div className="provider-list">
                                                        {providers[countryCode].flatrate.map((provider) => (
                                                            <div key={provider.provider_id} className="provider">
                                                                <img
                                                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                                    alt={provider.provider_name}
                                                                />
                                                                <span>{provider.provider_name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {providers[countryCode].buy && (
                                                <div className="provider-list-container">
                                                    <h4>Buy:</h4>
                                                    <div className="provider-list">
                                                        {providers[countryCode].buy.map((provider) => (
                                                            <div key={provider.provider_id} className="provider">
                                                                <img
                                                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                                    alt={provider.provider_name}
                                                                />
                                                                <span>{provider.provider_name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {providers[countryCode].rent && (
                                                <div className="provider-list-container">
                                                    <h4>Rent:</h4>
                                                    <div className="provider-list">
                                                        {providers[countryCode].rent.map((provider) => (
                                                            <div key={provider.provider_id} className="provider">
                                                                <img
                                                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                                    alt={provider.provider_name}
                                                                />
                                                                <span>{provider.provider_name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No countries found for your search.</p>
                                )}
                            </div>
                        ) : (
                            <p>Streaming information is not available for this movie.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;