import { AdminData } from "../../interface/AdminData.js";
export default class AuthRepository {
    verifyAdmin: (email: string, password: string) => Promise<AdminData | null>;
}
