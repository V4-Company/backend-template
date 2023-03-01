import axios from 'axios';

export const UsersApi = axios.create({
  baseURL: process.env.USERS_API,
});
