import SongPlayingAnimation from "./SongPlayingAnimation"

export default function ResultList({results, handleOnClick, selectedSong}) {

    return(
        <>
            <p className="font-medium mt-10 md:mt-0 mb-5">Recommendations</p>

            <div className="divide-y divide-gray-200 dark:divide-gray-700 text-sm font-medium text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {results.map( ( result, idx) =>
                    
                        <div
                            onClick={() => handleOnClick(result.idVideo)}
                            id={result.idVideo}
                            key={result.id} 
                            type="button" 
                            className={` flex items-center space-x-4 justify-between w-full px-4 py-2 font-medium text-left  cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}>
                    

                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Artist {result.idVideo}
                                </div>
                                <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Song {result.idVideo}
                                </div>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            { result.idVideo === selectedSong && <SongPlayingAnimation />}
                            </div>

                    
                    
                        </div>
                    )}
                </div>
        </>


     
    )
}