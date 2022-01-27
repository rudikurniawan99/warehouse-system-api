require('dotenv').config('../.env')
import express from 'express'
import connectDB from './utils/connectDB'

const port = process.env.PORT
const app = express()

app.listen(port || 4000, () => {
  console.log(`app running at http://localhost:${port}`);
  connectDB()
})