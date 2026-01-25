import express from 'express'
import { protect } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { addJobController, deleteJobController, editJobByIdController, getAllJobController, getJobByIdController } from '../controllers/jobController.js'


const jobRouter = express.Router()

jobRouter.post('/add-job',upload.single('image'), protect, addJobController)
jobRouter.post('/edit-job/:id',upload.single('image'), protect, editJobByIdController)
jobRouter.get('/all-job', getAllJobController)
jobRouter.get('/job/:id', getJobByIdController)
jobRouter.delete('/delete-job/:id', protect, deleteJobController)

export default jobRouter