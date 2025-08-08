import express from 'express';
import { 
    login,
    register,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    getToken,
    registerAdmin
} from '../controller/userController.js';
import verifyToken from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const userRouter = express.Router();

userRouter.post('/api/login', login);
userRouter.post('/api/register', register);
userRouter.post('/api/admin/register', verifyToken, isAdmin, registerAdmin);
userRouter.get('/api/getUsers', getAllUsers);
userRouter.get('/api/user/:id', verifyToken, getUser);
userRouter.delete('/api/user/:id', verifyToken, isAdmin, deleteUser);
userRouter.put('/api/user/:id', verifyToken, isAdmin, updateUser);
userRouter.post('/api/getToken', getToken);

export default userRouter;