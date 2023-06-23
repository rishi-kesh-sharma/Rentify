
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from  '../utils/generateToken.js'
//desc  Auth user/set token 
//route POST /api/users/auth
//access     Public

const authUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email

        })
        }else {
            res.status(401)
            throw new Error('Invalid Email Or Password')
    }
    
    res.status(200).json({message:'Auth User'})
})


//desc  Register a new User
//route POST /api/users
//access     Public

const registerUser=asyncHandler(async(req,res) =>{
    const { name, email, password}=req.body
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
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
            res.status(201)
            throw new Error('Invalid User Data')
    }

    res.status(200).json({message:'Register User'})
})

//desc  LogOut a user
//route POST /api/users/logout
//access     Public

const logOutUser=asyncHandler(async(req,res) =>{
    res.status(200).json({message:' LogOut User'})
})

//desc  Auth user/set token 
//route PUT /api/users/update
//access     Private

const updateUser=asyncHandler(async(req,res) =>{
    res.status(200).json({message:'Update User'})
})


//desc  Auth user/set token 
//route GET /api/users/auth
//access     Private

const getUserProfile=asyncHandler(async(req,res) =>{
    res.status(200).json({message:' View User Profile'})
})
export {authUser,registerUser,logOutUser,updateUser,getUserProfile} ;
