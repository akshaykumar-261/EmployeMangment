import mongoose, { mongo } from "mongoose";

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
const LoginModel = mongoose.model("login", loginSchema);
export default LoginModel;