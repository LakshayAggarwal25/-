import React from 'react'
import bannerImg from "./assets/banner.jpg"

function trending() {
    return (
        <>
            <div className='my-16'>
                <div className='text-2xl font-bold text-center mb-6'>Trending Movies</div>
                <div className="flex flex-wrap sm:m-1 md:mx-4 lg:mx-6 justify-around gap-2 sm:gap-4 md:gap-6 lg:gap-8">

                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>



                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>


                    <div className={`bg-[url(${bannerImg})] h-[30vh] w-[45vw] lg:h-[35vh] xl:w-[30vw] bg-center bg-cover bg-no-repeat flex items-end text-white rounded-2xl hover:scale-105 sm:hover:scale-110 ease-in-out duration-500`}>
                        <div className="w-full text-xl text-center bg-gray-900 p-2 bg-opacity-80 rounded-b-2xl">Title</div>
                    </div>

                    
                </div>
            </div>
        </>
    )
}

export default trending