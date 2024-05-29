import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmYzYWRkYjhmYThiZTRiZmQ0YzU1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDQyNjkwNCwiZXhwIjoxNzEwNjg2MTA0fQ.Gg23ZucXGUCbY70J8xsQ-D7olix0nrSw16CgHKaxVY0"

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${Token}` }
});