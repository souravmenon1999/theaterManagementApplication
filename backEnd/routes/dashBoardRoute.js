import express from 'express';
import {verifyUser} from '../middlewares/authMiddleware.js';
import { addTheater,getAllTheater,addScreen, getScreens } from '../controllers/dashBoardManagement.js';




const router = express.Router();

router.get('/getTheaters',verifyUser, getAllTheater )
router.post('/addTheater', verifyUser, addTheater );
router.post('/addScreen', verifyUser, addScreen);
router.post('/getScreens', verifyUser, getScreens);


//
export default router;