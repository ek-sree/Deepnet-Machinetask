import { createToken } from "../../utils/jwtToken.js";
import { StatusCode } from "../../interface/statusCode.js";
import AuthRepository from "../repository/authRepo.js";
const authRepo = new AuthRepository();
export default class AuthUseCase {
    constructor() {
        this.checkAdmin = async (email, password) => {
            try {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return { status: StatusCode.BadRequest, message: "Invalid email format" };
                }
                const isAdmin = await authRepo.verifyAdmin(email, password);
                if (!isAdmin) {
                    return { status: StatusCode.Unauthorized, message: "Invalid credentials" };
                }
                const token = createToken(isAdmin._id);
                return { status: StatusCode.OK, message: "Login successful", token };
            }
            catch (error) {
                console.log("Error registring in use-case", error);
                return { status: StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
    }
}
