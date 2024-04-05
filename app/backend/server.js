import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

await connectDB()

const app = express();
// app.set('base', '/clothing-online-recommender')
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use (( req, res, next ) =>{
    const error = new Error (`Page not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})
app.use (( e, req, res, next ) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: e.message,
        stack: process.env.NODE_ENV === 'production' ? null : e.stack

    })
})

const hostname = '127.0.0.1';
const server = express();
server.use("/clothing-online-recommender-backend", app)
const PORT = process.env.PORT || 4000

server.listen(PORT, hostname, 
    function (){
        console.log(`Server runs on port ${PORT}`)});
