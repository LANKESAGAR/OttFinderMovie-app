import React, { createContext, useEffect, useReducer } from 'react'

const initialState = {
    watchlist:JSON.parse(localStorage.getItem('watchlist')) || [],
};

const watchlistReducer = (state, action)=>{
    switch (action.type) {
        case 'ADD_MOVIE':
            return {
                ...state,
                watchlist:[...state.watchlist,action.payload],
            }
        case 'REMOVE_MOVIE':
            return{
                ...state,
                watchlist:state.watchlist.filter(movie => movie.id !== action.payload),
            }
    
            default:
                return state;
    }
};

export const WatchlistContext = createContext();

export const WatchlistContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(watchlistReducer, initialState);

    useEffect(()=>{
        localStorage.setItem('watchlist',JSON.stringify(state.watchlist))
    },[state.watchlist])

    return (
        <WatchlistContext.Provider value={{ state, dispatch }}>{children}</WatchlistContext.Provider>
    )
};


//export const useWatchlist = () => useContext(WatchlistContext);

