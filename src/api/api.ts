import axios from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const api = axios.create({
  baseURL: 'https://ifmatch-api.onrender.com/'
})