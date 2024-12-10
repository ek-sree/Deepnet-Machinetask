import mongoose, { Document, Schema, Types } from "mongoose";
export interface ProductInterface extends Document {
    _id: Types.ObjectId;
    productName:string;
    productPrice:number;
    productDescription:string;
    category: mongoose.Types.ObjectId;
    isStatus:boolean;
  }

const ProductSchema: Schema<ProductInterface> = new Schema({
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true, 
    },
    isStatus:{
        type:Boolean,
        default:true
    }
  }, {
    timestamps: true,
  });
  
  const productModel = mongoose.model<ProductInterface>('Product', ProductSchema);
  
  export default productModel;
  