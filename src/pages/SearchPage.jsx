import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { loading, movies, listTitle, suggestions, clearSuggestions } = useMovies(debouncedSearchTerm);

    const handleSuggestionClick = (title) => {
        setSearchTerm(title);
        clearSuggestions();
    };

    return (
        <div className="search-page-container">
            <h1>{listTitle}</h1>

            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((movie) => (
                            <li key={movie.id} onClick={() => handleSuggestionClick(movie.title)}>
                                <Link to={`/movie/${movie.id}`}>
                                    {movie.title} ({movie.release_date?.substring(0, 4)})
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {loading && <div className="loading">Loading...</div>}

            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>

    );
};

export default SearchPage;
