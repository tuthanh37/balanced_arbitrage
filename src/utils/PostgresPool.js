import { Pool } from 'pg'
import {} from 'dotenv/config'

export const pool = new Pool(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
  }
)
