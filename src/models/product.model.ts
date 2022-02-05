import mongoose, { Document, Schema } from 'mongoose' 
import { UserDocument } from './user.model'

export interface ProductInput {
  adminId: UserDocument['_id']
  name: string,
  stock?: number,
  size?: string[]
}

export interface ProductDocument extends ProductInput, Document {
  createdAt: Date
  updatedAt: Date
} 

const productSchema = new mongoose.Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
  },
  size: {
    type: [Schema.Types.ObjectId],
    default: []
  }
}, {
  timestamps: true
})

const Product = mongoose.model<ProductDocument>('Product', productSchema)
export default Product