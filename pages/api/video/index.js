import fs from 'fs';
import path from 'path';

/* This API is only to test during development, without the necessity of the API that will be used for production */

const songUrls = path.join(process.cwd(), 'data/id_url_mmsr.tsv');
const fileContent = fs.readFileSync(songUrls, 'utf8');

const data = fileContent.split('\n').map( (row, index) => {
    if(index == 0) return {}
    const info = row.split('\t');
   
    return { 
       "idSong": info[0],
       "idVideo" : info[1]
     }
})

const getRandomSong = () => {
    let min = 1
    let max = data.length-1
    return data[Math.floor(Math.random() * (max- min + 1)) + min];
}

export default function handler(req, res) {
    res.status(200).json(getRandomSong())
  }