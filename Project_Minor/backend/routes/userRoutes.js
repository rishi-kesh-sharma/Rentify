  import express from 'express'
  const router = express.Router()
  import  {authUser,getUserProfile,logOutUser,registerUser,updateUser} from '../controllers/userControllers.js'
 
  router.post('/auth',authUser)
  router.post('/',registerUser)
  router.post('/logout',logOutUser)
  router.post('/update',updateUser)
  router.post('/view',getUserProfile)

  export default router
