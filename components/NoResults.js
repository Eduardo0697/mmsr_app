export default function NoResults({initial}){
    return (
        <div className="flex flex-col">
            <div className="flex justify-center pt-5">
                <svg className="w-1/5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>


            <div className="flex justify-center ">
                <div className="text-center font-light py-4 ">
                    { initial ?
                        <span className="text-4xl leading-relaxed text-gray-500 dark:text-white">
                            Give us a song or artist and you will get a list of similar songs that you'll love
                        </span>
                    :
                        <>
                            <span className="text-4xl leading-relaxed text-gray-500 dark:text-white">No results found </span>
                            <br/>
                            <span className="text-2xl leading-relaxed text-gray-500 dark:text-white">Try with another query.</span>
                        </>
                    }
                        
                </div>

            </div>
            
  
           
            
        </div>
    )
}