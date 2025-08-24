import { useEffect, useState } from 'react';
import axios from 'axios';

const useMovieID = (id) => {
    const [movie, setMovie] = useState(null);
    const [providers, setProviders] = useState(null);
    const [loadingProviders, setLoadingProviders] = useState(true);
    const [videoKey, setVideoKey] = useState(null); // New state for video key

    const fetchMovie = async () => {
        try {
            const [movieResponse, providersResponse, videosResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
                axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
                axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
            ]);

            setMovie(movieResponse.data);
            setProviders(providersResponse.data.results);

            // First, try to find a TMDB trailer
            const tmdbTrailer = videosResponse.data.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );

            if (tmdbTrailer) {
                setVideoKey(tmdbTrailer.key);
            } else {
                // If no TMDB trailer, search YouTube as a fallback
                const youtubeSearchResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieResponse.data.title} official trailer&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
                );

                if (youtubeSearchResponse.data.items.length > 0) {
                    setVideoKey(youtubeSearchResponse.data.items[0].id.videoId);
                } else {
                    setVideoKey(null);
                }
            }

        } catch (error) {
            console.error("Error fetching movie details:", error);
            setProviders(null);
            setVideoKey(null);
        } finally {
            setLoadingProviders(false);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    return { movie, providers, loadingProviders, videoKey };
};

export default useMovieID;