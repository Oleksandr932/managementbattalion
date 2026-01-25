import express from 'express'
import { protect } from '../middleware/auth.js'
import { addNeedsController, deleteNeedsController, getAllNeedsController } from '../controllers/needsController.js'
import upload from '../middleware/multer.js'

const needsRouter = express.Router()

needsRouter.post('/add-needs', protect, upload.none(), addNeedsController)
needsRouter.delete('/delete-needs/:id', protect, deleteNeedsController)
needsRouter.get('/all-needs', getAllNeedsController)

export default needsRouter