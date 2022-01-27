import mongoose from 'mongoose'

const dbUri = process.env.DB_URI
const dbName = process.env.DB_NAME

const connectDB = async () => {
  try {
    await mongoose.connect(String(dbUri), {
      dbName
    }, () => {
      console.log(`success connect to '${dbName}' db`);
    }) 
  } catch (e) {
    console.log(e) 
  }
}

export default connectDB