import { useState, useEffect, useRef } from 'react';
import Turnstone from 'turnstone'

const styles = {
    input: 'w-full border py-2 px-4 text-lg outline-none rounded-l-md',
    listbox: 'bg-white w-full text-zinc-900 rounded-md font-sans text-lg border',
    
    query: 'text-oldsilver-800 placeholder:text-slate-600',
    typeahead: 'text-slate-500',
    clearButton: 'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-slate-500',
    noItems: 'cursor-default text-center my-20',
    match: 'font-bold',
    groupHeading: 'px-5 py-3 text-pink-500',
    item: 'py-2 md:py-1',
    highlightedItem: 'py-2 md:py-1 bg-slate-200',
  }

const maxItems = 10

export default function SearchBar({handleSearchonClick, handleQueryOnChange, handleQueryOnEnter, trigger}){

    const [songs, setSongs] = useState({});
    const turnstoneRef = useRef()

    useEffect(() => {
       fetch('/api/songs')
        .then((response) => response.json())
        .then((data) => {
            const listbox = {
                displayField: 'sonmixedg',
                searchType: 'contains',
                data: data
            }
            setSongs(listbox);
            console.log('Songs recovered');
        });
    }, []);

    useEffect(() => {
        if(trigger>0){
            turnstoneRef.current?.clear()
        }
    }, [trigger])

    return(
        <div className="flex flex-row basis-full md:basis-3/5">
            <div className="grow">
                <Turnstone
                    ref={turnstoneRef}
                    id="autocomplete"
                    listbox={songs} 
                    styles={styles}  
                    matchText={true} 
                    placeholder="Search a Song or an Artist"
                    noItemsMessage="We found no song or artist that match your search"
                    // cancelButton={true}
                    clearButton={true}
                    onChange={handleQueryOnChange}
                    onEnter={handleQueryOnEnter}
                    typeahead={true}
                    maxItems={maxItems}
                />
            </div>
            <div className="">
                <button onClick={handleSearchonClick}  type="button" className="h-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>

        </div>
    )
}