import axios from 'axios';

export const CustomerApi = axios.create({
  baseURL: process.env.CUSTOMER_API,
});
