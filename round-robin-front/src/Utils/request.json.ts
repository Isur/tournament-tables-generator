import axios from 'axios';

export const requestJson = axios.create({
    baseURL: "http://localhost:3004/api/v1/",
});
