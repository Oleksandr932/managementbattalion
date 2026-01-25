import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from '../configs/db.js'

import userRouter from '../routes/userRoutes.js'
import reportsRouter from '../routes/reportsRouter.js'
import needsRouter from '../routes/needsRouter.js'
import jobRouter from '../routes/jobRouter.js'
import categoryRouter from '../routes/categoryRouter.js'

const app = express()

const allowedOrigins = [
  'https://162ombr-three.vercel.app',
  'https://managementbattalion.162ombr.com.ua',
  'https://www.managementbattalion.162ombr.com.ua'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

let isConnected = false
const connectOnce = async () => {
  if (!isConnected) {
    await connectDB()
    isConnected = true
  }
}

app.use(async (req, res, next) => {
  await connectOnce()
  next()
})

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api/user', userRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/needs', needsRouter)
app.use('/api/job', jobRouter)
app.use('/api/category', categoryRouter)

export default app
