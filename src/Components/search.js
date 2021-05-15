import axios from 'axios';

const md5 = require('md5');
    const baseUrl = "https://gateway.marvel.com:443/v1/public/"
    const publicKey = process.env.REACT_APP_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;
    const ts = 1;
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);


export default async function search(props) {

    if(props.defaultSearch === true){ //default search Meaning requesting all data for item
    const type = props.type
    const offset = props.offset
    const url = baseUrl + type + '?offset=' + offset + '&limit=18&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let response = await axios.get(url);
    return response.data.data;
    } else { //requesting a singular item
        let url = props.url + '?offset=' + props.offset + '&limit=18&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash
        url = url.replace('http', 'https')
        let response = await axios.get(url);
        return response.data.data
    }
    

}

