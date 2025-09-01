import express from 'express';
import {
    createProject, 
    getMyProjects, 
    updateProject, 
    deleteProject, 
    getProjectById
} from '../controller/project/projectController.js';

import {
    likeProject,
    unlikeProject,
    saveProject,
    unsaveProject,
    addComment,
    deleteComment
} from '../controller/project/projectInteractionController.js';

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

//like and unlike project
projectRouter.post('/api/projects/:projectId/like', verifyToken, likeProject);
projectRouter.delete('/api/projects/:projectId/like', verifyToken, unlikeProject);

//save and unsave project
projectRouter.post('/api/projects/:projectId/save', verifyToken, saveProject);
projectRouter.delete('/api/projects/:projectId/save', verifyToken, unsaveProject);

//add comment and delete comment
projectRouter.post('/api/projects/:projectId/comment', verifyToken, addComment);
projectRouter.delete('/api/comments/:commentId', verifyToken, deleteComment);

export default projectRouter;