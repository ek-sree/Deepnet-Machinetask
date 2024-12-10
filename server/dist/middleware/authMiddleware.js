import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../config/index.js';
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided, please login' });
        return;
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = {
            userId: new Types.ObjectId(decoded.userId),
        };
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
