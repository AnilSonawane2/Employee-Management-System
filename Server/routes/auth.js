import express from 'express'
import AuthController from '../controllers/authController.js'
import verifyUser from '../middlewares/authmiddleware.js'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/verify', verifyUser, AuthController.verify) // Auth Middleware

export default router