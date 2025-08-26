import { useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'
import { WatchlistContext, WatchlistContextProvider } from './context/WatchlistContext'
import SearchPage from './pages/SearchPage'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import MovieDetailPage from './pages/MovieDetailPage'
import WatchlistPage from './pages/WatchlistPage'
import Footer from './components/Footer'

function App() {

  return (
    <WatchlistContextProvider>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<SearchPage />} />
            <Route path='/movie/:id' element={<MovieDetailPage />} />
            <Route path='/watchlist' element={<WatchlistPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WatchlistContextProvider>
  )
}

export default App
