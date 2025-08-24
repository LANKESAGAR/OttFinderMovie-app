import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <div className="header-logo">
            <Link to='/'>Movieflix</Link>
        </div>
        <nav className='header-nav'>
            <ul>
                <li>
                    <Link to='/'>Search</Link>
                </li>
                <li>
                    <Link to='/watchlist'>Watchlist</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
