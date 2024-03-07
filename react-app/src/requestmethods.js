import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTIyY2UwNWM3MTRmYWIwYjE0ZDEwMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTMyMTY5MSwiZXhwIjoxNzA5NTgwODkxfQ.XwzT488-OT0nLuNGsQEWzqhqTm4DHBkzP2S4tj_hu90"

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${Token}` }
});