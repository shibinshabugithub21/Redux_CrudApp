import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.js'
import cookieParser from 'cookie-parser';

dotenv.config();


mongoose.connect(process.env.Mongodb).then(()=>{
    console.log('Connected to mongoDb')
}).catch((err)=>{
    console.log(err);
})

const app=express();

app.use(express.json())

app.use(cookieParser())

app.listen(3000,()=>{
    console.log("Server is running on the port 3000");
});

app.use("/api/user/",userRoutes)
app.use("/api/auth/",authRoutes)
app.use('/api/admin/',adminRoutes)


// Error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode,
    });
});
