import fs from 'fs';
import path from 'path';

/* This API is only to test during development, without the necessity of the API that will be used for production */

const songUrls = path.join(process.cwd(), 'data/id_url_mmsr.tsv');
const fileContent = fs.readFileSync(songUrls, 'utf8');

const data = fileContent.split('\n').map( (row, index) => {
    if(index == 0) return {}
    const info = row.split('\t');
   
    return { 
       "id": info[0],
       "url" : info[1],
       "name" : `Artist-Song ${info[0]} `,
       "genres": "[pop, rock, jazz]"
     }
})

const getRandomSong = (numberVideos) => {
    let min = 1
    let max = data.length-1
    let listVideos = []
    for (let i = 0; i < numberVideos; i++) {
      listVideos.push(data[Math.floor(Math.random() * (max- min + 1)) + min])
    }
    return listVideos
}

export default function handler(req, res) {
    const { numberVideos } = req.query;
    res.status(200).json(getRandomSong(numberVideos))
  }