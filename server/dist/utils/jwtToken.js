import jwt from 'jsonwebtoken';
import config from '../config/index.js';
export const createToken = (userId) => {
    const token = jwt.sign({ userId: userId.toString() }, config.SECRET_KEY, { expiresIn: '1h' });
    return token;
};
