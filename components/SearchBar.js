import { useState, useEffect } from 'react';

export default function SearchBar(){

    const [search, setSearch] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
       fetch('/api/songs')
        .then((response) => response.json())
        .then((data) => {
            setSongs(data);
            console.log('Songs recovered');
        });
    }, []);

    return(
        <div>
           
        </div>
    )
}