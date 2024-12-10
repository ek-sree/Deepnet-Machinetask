import { createToken } from "../../utils/jwtToken.js";
import { StatusCode } from "../../interface/statusCode.js";
import AuthRepository from "../repository/authRepo.js";

const authRepo = new AuthRepository()

export default class AuthUseCase{

    checkAdmin =async(email:string, password:string):Promise<{status:number, message:string, token?:string}> =>{
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return { status: StatusCode.BadRequest as number, message: "Invalid email format" };
      }

      const isAdmin = await authRepo.verifyAdmin(email, password);
      if (!isAdmin) {
        return { status: StatusCode.Unauthorized as number, message: "Invalid credentials" };
      }

      const token = createToken(isAdmin._id)
      return { status: StatusCode.OK as number, message: "Login successful" ,token };
        } catch (error) {
            console.log("Error registring in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }
}