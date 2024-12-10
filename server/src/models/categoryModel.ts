import mongoose, { Document, Schema, Types } from "mongoose";

export interface SellerInterface extends Document {
    _id:Types.ObjectId;
    categoryName:string;
    categoryTitle:string;
    categoryImage: string[];
    isStatus:boolean;
  }

const categorySchema: Schema<SellerInterface> = new Schema({
    categoryName: {
      type: String,
      required: true,
      trim: true,
      set: (name: string) => name.toUpperCase(),
    },
    categoryTitle:{
        type: String,
        required:true,
        set: (name: string) => name.toUpperCase(),
    },
    categoryImage: {
        type: [String],
        required: true,
    },
    isStatus:{
        type:Boolean,
        required: true,
        default:true
    }
  }, {
    timestamps: true,
  });
  
  const categoryModel = mongoose.model<SellerInterface>('Category', categorySchema);
  
  export default categoryModel;
  