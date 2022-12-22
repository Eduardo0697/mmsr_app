import fs from 'fs';
import path from 'path';

const songs = path.join(process.cwd(), 'data/id_information_mmsr.tsv');
const fileContent = fs.readFileSync(songs, 'utf8');
const data = fileContent.split('\n').map( (row, index) => {
    if(index == 0) return {}
    const info = row.split('\t');
    return{
        // id: info[0], // If included data is 2.4 MB, if not 1.1 MB only, let the API find the id
        artist: info[1],
        song: info[2],
    }
})

export default function handler(req, res) {
    res.status(200).json(data)
  }