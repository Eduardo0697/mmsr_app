import Head from 'next/head'
import SearchBar from '../components/SearchBar';
import VideoPlayer from '../components/VideoPlayer';
import ResultList from '../components/ResultList';
import NoResults from '../components/NoResults';
import NavBar from '../components/NavBar';
import FooterContainer from '../components/FooterSection';
import PlaceholderList from '../components/placeholderList';
import { useState, useEffect, useRef } from 'react';


export default function Home() {

  const [search, setSearch] = useState('');
  const [querySuccesful, setquerySuccesful] = useState(false);
  const [songToPlay, setSongToPlay] = useState({ "song" : "", "name" : "", "id" : ""});
  const [results, setResults] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [stateZero, setStateZero] = useState(true);
  const [clearSearchbox, setClearSearchbox] = useState(0);
  const [loading, setLoading] = useState(false);

  const extractVideoIdFromUrl = (url) => {
    const extractVideoId2 = /\=(.*)/;
    return url.match(extractVideoId2)[1]
  }
  const sendQuery = (query) => {
    // console.log("Fetch API", query.split("-"))
    const queryArray =  query.split("/")
    let artist = encodeURIComponent(queryArray[0])
    let song = encodeURIComponent(queryArray[1])
    // console.log(artist, song)

    fetch(`https://api-mmsr.herokuapp.com/query/?artist=${artist}&track=${song}&top=20&model=model`)
      .then((response) => response.json())
      .then((songsInfo) => {
        // console.log("Recovering", songsInfo)

        if(songsInfo.error != undefined){
          setMetrics({})
          setResults([])
          setLoading(false)
          setquerySuccesful(false)

        }else{

          song = {
            "id" : songsInfo.song[0].id, 
            "idVideo" : extractVideoIdFromUrl(songsInfo.song[0].url),
            "name": songsInfo.song[0].name,
            "genres": songsInfo.song[0].genre,
            "artist" : songsInfo.song[0].artist,
            "song" : songsInfo.song[0].song,
            "album": songsInfo.song[0].album_name
          };
    
          const results = songsInfo.top.map( el => { 
              return {
                "id" : el.id, 
                "idVideo" : extractVideoIdFromUrl(el.url),
                "name": el.name,
                "genres": el.genre,
                "artist" : el.artist,
                "song" : el.song,
                "album": el.album_name
              }
            })
     
           
            setMetrics(songsInfo.metrics)
            setResults([song,...results])
            setLoading(false)
            setquerySuccesful(true)

        }

        
        
      });
  }

  const handleHomeOnClick = () => {
    setStateZero(true)
    setResults([])
    setMetrics({})
    setquerySuccesful(false)
    setSongToPlay({ "song" : "", "name" : "", "id" : ""})
    setSearch("")
    setClearSearchbox(e => e+=1)
  }
  const handleSelectedSongPlay = (id, name, idSong) => {
    setSongToPlay({ "song" : id, "name" : name, "id" :idSong})
  }

  const handleSearchonClick = () => {
      setStateZero(false)
      if(search===""){
        setSongToPlay({ "song" : "", "name" : "", "id" : ""})
        setquerySuccesful(false)
      }else{
        setLoading(true);
        setSongToPlay({ "song" : "", "name" : "", "id" : ""})
        sendQuery(search);
      }
      
  }

  const handleQueryOnChange = (queryValue) => {
      setSearch(queryValue)
  }

  const handleQueryOnEnter = (queryValue, selectedItem) => {
      setStateZero(false)
      if(search===""){
        setSongToPlay({ "song" : "", "name" : "", "id" : ""})
        setquerySuccesful(false)
      }else{
        setLoading(true);
        setSongToPlay({ "song" : "", "name" : "", "id" : ""})
        if(selectedItem != undefined){
          sendQuery(selectedItem.text);
        }else{
          sendQuery(queryValue);
        }
        
      }
  }

  const handleQueryOnSelect = (selectedItem, displayField) => {
    console.log(selectedItem, displayField)
  }

  return (
    <>
      <Head>
        <title>MMSR APP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <main className="flex flex-col justify-between items-center px-5 py-32 md:p-28 min-h-screen">
        <NavBar handleHomeOnClick={handleHomeOnClick}>
        { querySuccesful  && 
            <SearchBar
              trigger={clearSearchbox}
              handleSearchonClick={handleSearchonClick} 
              handleQueryOnChange={handleQueryOnChange} 
              handleQueryOnEnter={handleQueryOnEnter}
              handleQueryOnSelect={handleQueryOnSelect}>
                
            </SearchBar>
        }
        </NavBar>
    
        <div className="container mx-auto content">

        { loading && <PlaceholderList />}
        { !querySuccesful && !loading  && 
        
        
          <div className='flex flex-col'>
            <NoResults initial={stateZero} /> 
            <div className='self-center w-full md:w-2/3'>
              <SearchBar
                trigger={clearSearchbox}
                handleSearchonClick={handleSearchonClick} 
                handleQueryOnChange={handleQueryOnChange} 
                handleQueryOnEnter={handleQueryOnEnter}
                handleQueryOnSelect={handleQueryOnSelect}>
                  
              </SearchBar>
            </div>
            
          </div> 
          
      
          
        }
        { querySuccesful && !loading &&
          <div className="flex flex-row flex-wrap">
              { songToPlay.song !== "" && 
                <div className="grow basis-full md:basis-2/3 pr-0 md:pr-5 mb-7">
                  <VideoPlayer songToPlay={songToPlay} ></VideoPlayer>  
                  <span className="relative font-medium pt-5 text-xl">{songToPlay.name}</span>
                </div>
              }
            
              { results.length !== 0 && 
                <div className={`grow ${songToPlay.song !== "" ? 'basis-full md:basis-1/3' : 'basis-full'}`}>

                  <ResultList metrics={metrics} results={results} handleOnClick={handleSelectedSongPlay} selectedSong={songToPlay.id}/>

                </div>
              }

          </div>
        
          
        
            
        }
         
        </div>
        
      </main>
      <FooterContainer />
     
    </>
  )
}
