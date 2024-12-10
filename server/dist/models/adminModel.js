import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema({
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
const adminModel = mongoose.model('Admin', adminSchema);
export default adminModel;
