import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'

import userRouter from './routes/userRoutes.js'
import reportsRouter from './routes/reportsRouter.js'
import needsRouter from './routes/needsRouter.js'
import jobRouter from './routes/jobRouter.js'

const app = express()  

const allowedOrigins = [
  'https://162ombr-three.vercel.app',
  'https://bu.162ombr.com.ua',
  'https://www.bu.162ombr.com.ua'
]

app.use(cors({
  origin: function (origin, callback) {
    // дозволяємо запити без origin (Postman, SSR)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api/user', userRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/needs', needsRouter)
app.use('/api/job', jobRouter)

const PORT = process.env.PORT || 3000
 

// ⬇️ ВАЖЛИВО: старт через async-функцію
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server failed to start:', error)
  }
}

startServer()
