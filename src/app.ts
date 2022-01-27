require('dotenv').config('../.env')
import express from 'express'
import connectDB from './utils/connectDB'
import router from './routes'

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(router)

app.listen(port || 4000, () => {
  console.log(`app running at http://localhost:${port}`);
  connectDB()
})