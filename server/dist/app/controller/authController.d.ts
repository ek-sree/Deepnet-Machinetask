import { Request, Response } from "express";
export default class AuthController {
    private authUseCase;
    constructor();
    verifyAdmin: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
}
