import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.artic.edu/api/v1/artworks',
});
