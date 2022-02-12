import React from 'react'
import MovieLogo from "./assets/movie.jfif";

function navbar() {
    return (
        <>
            <div className="flex gap-8 items-center p-4 font-bold text-blue-900 text-lg md:text-xl lg:text-2xl md:p-8">
                <img src={MovieLogo} className="h-16 cursor-pointer"></img>
                <div className="cursor-pointer">Home</div>
                <div className="cursor-pointer">Movies</div>
                <div className="cursor-pointer">Favourites</div>
            </div>
        </>
    )
}

export default navbar