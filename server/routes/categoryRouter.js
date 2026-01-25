import express from 'express'
import { protect } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { addCategoryController, deleteCategoryController, getAllCategoryController } from '../controllers/categoryController.js'

const categoryRouter = express.Router()

categoryRouter.post('/add-category',upload.single('image'), protect, addCategoryController)
categoryRouter.delete('/delete-category/:id', protect, deleteCategoryController)
categoryRouter.get('/all-category', getAllCategoryController)

export default categoryRouter