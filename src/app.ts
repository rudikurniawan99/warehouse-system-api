require('dotenv').config('../.env')
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './utils/connectDB'
import router from './routes'

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public/images'))
app.use(cookieParser())
app.use(router)

app.listen(port || 4000, () => {
  console.log(`app running at http://localhost:${port}`);
  connectDB()
})