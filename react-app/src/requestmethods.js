import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmYzYWRkYjhmYThiZTRiZmQ0YzU1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzcyMjg5NSwiZXhwIjoxNzA3OTgyMDk1fQ.bKx97fLzAfHEAAIiMDe2x5p9LwFsK4FHyi5Rs3st4ZQ"

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${Token}` }
});