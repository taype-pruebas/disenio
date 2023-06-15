import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// rutas
import rootRouter from '../routes'

const server = express()
dotenv.config()


server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use('/api', rootRouter)

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected to MongoDB')
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err)
})


server.get('/', (req, res) => {
    res.redirect('/api')
})

export default server