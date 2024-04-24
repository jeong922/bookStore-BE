import dotenv from 'dotenv';

dotenv.config();

function required(key: string, defaultValue: any = undefined) {
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
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('BD_DATABASE'),
    port: parseInt(required('BD_PORT')),
  },

  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 300)),
    issuer: required('JWT_ISSUER'),
  },
};
