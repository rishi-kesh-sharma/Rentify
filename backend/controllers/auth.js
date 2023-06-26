
const asyncHandler =require('express-async-handler') 
const User =require('../models/user.js') 
const generateToken =require('../utils/generateToken.js')  

//desc  Register a new User
//route POST /api/users
//access     Public

const register=asyncHandler(async(req,res) =>{
    const { name, email, password}=req.body
    const userExists = await User.findOne({email})
    if (userExists){
        
        throw new Error('User Already exists')
    }
    const user= await User.create({
        name,
        email,
        password
    })

    if (user){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email

        })
        }else {
            throw new Error('Invalid User Data')
    }

    res.status(200).json({message:'Register User'})
})


// login

const login = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    
    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))){
        const token=generateToken(res, user._id)
       return res.cookie ('token', token, {
            httpOnly: true,
            secure : process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1*24*60*60*1000
           }).json({user,token})
        }else {
            throw new Error('Invalid Email Or Password')
    }
    
    res.status(200).json({message:'Auth User'})
})

//desc  LogOut a user
//route POST /api/users/logout
//access     Public

const logout=asyncHandler(async(req,res) =>{
   try{
    res.clearCookie("token").json({message:' LogOut User'})
   }catch(err){

       throw new Error("Error while logging out")
   }

})
module.exports={login,register,logout} ;
