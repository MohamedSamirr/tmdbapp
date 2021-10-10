import axios from 'axios';

// Insira aqui sua api_key
const apiKey = '4f298a53e552283bee957836a529baec';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params:{
    api_key: apiKey,
  }
});
