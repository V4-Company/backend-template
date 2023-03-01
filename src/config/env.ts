import path from 'path';
import dotenv from 'dotenv';

const getEnvPath = (): string => {
  if (process.env.NODE_ENV === 'development') return '../../.env.development';
  if (process.env.NODE_ENV === 'homolog') return '../../.env.homolog';
  return '../../.env';
};

dotenv.config({
  path: path.resolve(__dirname, getEnvPath()),
});
