import pkg from 'pg'
import dotenv from 'dotenv'

import path from 'path'
import { fileURLToPath } from 'url'
const { Pool } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Explicitly load .env from the server folder
dotenv.config({ path: path.join(__dirname, '../.env') })

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: String(process.env.PG_PASSWORD),
  port: Number(process.env.PG_PORT),
  ssl: {
    rejectUnauthorized: false
  }
})

// Test the connection immediately
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message)
  } else {
    console.log(`✅ Database connected successfully to: ${process.env.PG_HOST}`)
  }
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export default {
  query: (text, params) => pool.query(text, params),
}
