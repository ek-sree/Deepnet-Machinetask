import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { Types } from 'mongoose';

export const createToken = (userId:Types.ObjectId) => { 
    const token = jwt.sign(
      { userId: userId.toString()}, 
      config.SECRET_KEY, 
      { expiresIn: '1h' }
    );
    return token;
  };

