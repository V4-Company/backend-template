import axios from 'axios';

export const LegacyFinanceAPI = axios.create({
  baseURL: process.env.LEGACY_FINANCE_API,
});
