import mongoose, { Document, Schema, Types } from "mongoose";
export interface AdminInterface extends Document {
    _id:Types.ObjectId;
    email: string;
    password: string;
  }

const adminSchema: Schema<AdminInterface> = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  }, {
    timestamps: true,
  });
  
  const adminModel = mongoose.model<AdminInterface>('Admin', adminSchema);
  
  export default adminModel;
  