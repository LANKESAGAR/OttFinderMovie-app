import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovies = (debouncedSearchTerm) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let response;
      if (debouncedSearchTerm.trim() === '') {
        response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovies(response.data.results);
        setListTitle(`Top ${response.data.results.length} Trending Movies`);
        setSuggestions([]);
      } else {
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${debouncedSearchTerm}`
        );
        setMovies(response.data.results);
        setListTitle(`Search Results for ${debouncedSearchTerm}`);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setListTitle('No Results Found');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${debouncedSearchTerm}`
      );
      setSuggestions(response.data.results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // 👇 expose a clearSuggestions function
  const clearSuggestions = () => setSuggestions([]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchTerm]);

  return { loading, movies, listTitle, suggestions, clearSuggestions };
};

export default useMovies;
