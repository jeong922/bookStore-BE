import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`${key}는 없음`);
  }

  return value;
}

export const config = {
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
};
