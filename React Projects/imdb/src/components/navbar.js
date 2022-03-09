import React from 'react'
import MovieLogo from "./assets/movie.jfif";
import {Link} from 'react-router-dom';

function navbar() {
    return (
        <>
            <div className="flex gap-8 items-center p-4 font-bold text-blue-900 text-lg md:text-xl lg:text-2xl md:p-8">
                <img src={MovieLogo} className="h-16 cursor-pointer"></img>
                <Link to="/" className="cursor-pointer">Home</Link>
                <Link to="movies" className="cursor-pointer">Movies</Link>
                <div className="cursor-pointer">Favourites</div>
            </div>
        </>
    )
}

export default navbar