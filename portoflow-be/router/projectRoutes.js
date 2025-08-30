import express from 'express';
import {
    createProject, 
    getMyProjects, 
    getProjectsByTag, 
    updateProject, 
    deleteProject, 
} from '../controller/project/projectController.js';

import { getProjectsByUsername, getProjectsByTag, searchProjects } from '../controller/project/projectQueryController.js'
import verifyToken from '../middleware/auth.js';

const projectRouter = express.Router();

//create project (user must log in)
projectRouter.post('/api/createProject', verifyToken, createProject);

//get all my projects
projectRouter.get('/api/getProjects', verifyToken, getMyProjects);

//get project by id (just owner)
projectRouter.get('/api/getProject/:id', verifyToken, getProjectById);

//get projects by username (public)
projectRouter.get('/api/getProjects/:username', verifyToken, getProjectsByUsername);

//get projects by tag (public)
projectRouter.get('/api/getProjects/:tagname', getProjectsByTag);

//update project by id(owner)
projectRouter.put('/api/project/:id', verifyToken, updateProject);

//delete project by id (owner)
projectRouter.delete('/api/project/:id', verifyToken, deleteProject);

//search project (public)
projectRouter.get('/api/searchProjects', searchProjects);

export default projectRouter;