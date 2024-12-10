import { Request, Response } from "express";
export default class AdminController {
    private adminUseCase;
    constructor();
    addCategory: (req: Request, res: Response) => Promise<void>;
    getCategoried: (req: Request, res: Response) => Promise<void>;
    addProducts: (req: Request, res: Response) => Promise<void>;
    getProducts: (req: Request, res: Response) => Promise<void>;
}
