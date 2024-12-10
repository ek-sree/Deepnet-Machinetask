import { Request, Response } from "express";
export default class UserController {
    private userUseCase;
    constructor();
    getCategoried: (req: Request, res: Response) => Promise<void>;
    getPoroducts: (req: Request, res: Response) => Promise<void>;
}
