import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRoutes from './routes/api.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api', apiRoutes)

// Serve Frontend
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))

// Catch-all to support SPA routing
app.get('*path', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
