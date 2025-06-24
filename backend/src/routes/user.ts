import { Router } from 'express';
import { forgetPassword, login, register, resetPassword } from '../handlers/user';

const route = Router();

route.post('/register', register);
route.post('/login', login);
route.post('/forget-password', forgetPassword);
route.put('/reset-password', resetPassword); 

export default route;