import axios from 'axios';

export const UnitsAPI = axios.create({
  baseURL: process.env.UNITS_API,
});
