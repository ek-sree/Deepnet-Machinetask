import { Request, Response } from "express";
import AuthUseCase from "../use-case/authUseCase.js";
import { StatusCode } from "../../interface/statusCode.js";

export default class AuthController{
    private authUseCase: AuthUseCase;

    constructor(){
        this.authUseCase = new AuthUseCase();
    }

    verifyAdmin = async(req:Request, res:Response): Promise<void> =>{
        try {
            const email = req.body.email;
            const password = req.body.password;
            if(!email || !password){
                res.status(StatusCode.BadRequest).json({message:"Credients are missing"})
                return
            }
            const response = await this.authUseCase.checkAdmin(email,password)
            res.cookie('token',response.token,{httpOnly:true,secure:true,maxAge:3600000})
            res.status(response.status).json({message:response.message, token:response.token})
        } catch (error) {
            console.log("Error in register", error);
            res.status(StatusCode.InternalServerError).json({ message: "Internal server error"});
        }
    }

    logout = async(req:Request, res:Response): Promise<void>=>{
        try {
            res.clearCookie('token', { httpOnly: true, secure: true });
            res.status(StatusCode.OK).json({message:"Logout successfull"})
        } catch (error) {
            console.log("Error in logoutinh", error);
            res.status(StatusCode.InternalServerError).json({ message: "Internal server error"});
        }
    }
}