import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import router from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { todoMiddleware } from './middlewares/todoMiddleware.js';
import authModel from './models/authModel.js';
dotenv.config()
const app = express();

//imp middlewares
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173'
}))


//routes
app.use('/auth',router);
app.use('/api/todo',todoRoutes);

app.get('/api/me',todoMiddleware, async(req,res) => {
    try {
       const userName = req.userName
       return res.json({
        userName
       });
    } catch(error) {
        return res.status(500).json({
            message:error
        })
    }
})


//database connection
const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        await mongoose.connect(url)
        console.log("Database connected successfully")

    } catch (error) {
        console.log("Error found while connection with database:",error)
    }
}
const port = process.env.PORT || 5000

app.listen(port, () => {
    connectDB();
    console.log(`server is running in ${port}`);
})