import express from "express"
import { getuser,createuser,updateuser,deleteuser } from "../controllers/UserController.js"

const router=express.Router()

router.get('/user',getuser)
router.post('/tambahdata', createuser)
router.put('/edit-user/:id', updateuser)
router.delete('/delete-user/:id', deleteuser)
export default router;