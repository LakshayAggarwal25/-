import React from 'react'
import bannerImg from "./assets/banner.jpg"


function banner() {
    return (
        <>
            <div className={`bg-[url(${bannerImg})] bg-center bg-cover bg-no-repeat flex items-end text-white text-xl md:text-2xl lg:text-3xl text-center bg-black bg-opacity-90 h-[40vh] md:h-[50vh] lg:h-[65vh] `}>
                <div className="w-full text-center bg-gray-900 p-2 bg-opacity-80"> Spider-Man : No way home</div>
            </div>
        </>
    )
}

export default banner