import express from 'express'
import { protect } from '../middleware/auth.js'
import { addReportsController, deleteReportsController, getAllReportsController } from '../controllers/reportsController.js'
import upload from '../middleware/multer.js'

const reportsRouter = express.Router()

reportsRouter.post('/add-reports',upload.single('image'), protect, addReportsController)
reportsRouter.delete('/delete-reports/:id', protect, deleteReportsController)
reportsRouter.get('/all-reports', getAllReportsController)

export default reportsRouter