import express from 'express';
import { registerOwner, otpVerify, loginuser } from '../controllers/theaterAdmin.js';



const router = express.Router()

router.post('/register', registerOwner );
router.post('/otpverify', otpVerify);
router.post('/login', loginuser)

export default router;