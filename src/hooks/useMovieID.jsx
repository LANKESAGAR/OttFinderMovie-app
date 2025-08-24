import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useMovieID = (id) => {

    const [movie, setMovie] = useState(null);
    const [providers, setProviders] = useState(null);
    const [loadingProviders, setLoadingProviders] = useState(true);

    const fetchMovie = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );
            setMovie(response.data);

            const providersResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );

            setProviders(providersResponse.data.results);

        } catch (error) {
            console.error("Error fetching movie details:", error);
            setProviders(null);
        } finally {
            setLoadingProviders(false);
        }
    };

    useEffect(()=>{
        fetchMovie();
    }, [id])

  return {movie, providers, loadingProviders};
}

export default useMovieID
