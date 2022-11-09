const express = require ('express')
const dotenv = require ('dotenv').config()
const {errorHandler}=require('./middleware/errorMiddleware')
const port =process.env.PORT || 5000
const  app=express()
const colors = require('colors');
const  connectDB=require('./config/db')
 
connectDB()
app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
app.use('/user', require('./routes/userRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use(errorHandler)
app.listen(port,()=>console.log(`server started at port ${port}`))
