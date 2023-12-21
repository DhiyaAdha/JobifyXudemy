import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModels.js';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    //protect pasword (hash)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
};

export const login = async (req, res) => {
    res.send('login');
};