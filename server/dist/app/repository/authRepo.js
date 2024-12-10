import { comparePassword } from "../../utils/bcrypt.js";
import adminModel from "../../models/adminModel.js";
export default class AuthRepository {
    constructor() {
        this.verifyAdmin = async (email, password) => {
            try {
                const admin = await adminModel.findOne({ email });
                if (!admin) {
                    return null;
                }
                const isPassword = comparePassword(password, admin.password);
                if (!isPassword) {
                    return null;
                }
                return admin;
            }
            catch (error) {
                console.log("Error finding user in repo", error);
                return null;
            }
        };
    }
}
