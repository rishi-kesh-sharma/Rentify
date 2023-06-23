import express from 'express'
import dotenv from 'dotenv'

dotenv.config({path:"./.env"})
const PORT=process.env.PORT;
import { notfound,errorHandler } from './middleware/errormiddleware.js';
import connectDB  from './config/db.js';
import userRoutes from './routes/userRoutes.js'

connectDB()
const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))


app.use('/api/users', userRoutes)


app.use(notfound)
app.use(errorHandler)


app.get('/',(req,res) =>{
    res.send("The server is connected")
})

app.listen(PORT,() =>{
    console.log(`Server is connected on port ${PORT}`)
})

