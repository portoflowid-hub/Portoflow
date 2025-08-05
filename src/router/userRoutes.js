import express from 'express';
import { 
    login,
    register,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    getToken
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/api/login', login);
userRouter.post('/api/register', register);
userRouter.get('/api/getUsers', getAllUsers);
userRouter.get('/api/user/:id', getUser);
userRouter.delete('/api/user/:id', deleteUser);
userRouter.put('/api/user/:id', updateUser);
userRouter.post('/api/getToken', getToken);

export default userRouter;