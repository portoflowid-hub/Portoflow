import Project from '../models/Project.js';
import User from '../models/User.js';
import multer from 'multer'; //for procecing file upload
import path from 'path';

//create project by user
const createProject = async (req, res) => {
    try {
        const { title, description, imageUrl, projectUrl, tags} = req.body;

        const newProject = await Project.create({
            title,
            description,
            imageUrl,
            projectUrl,
            tags,
            user: req.user.id
        });

        if (!req.user || !req.user.id) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: user not found in request'
            });
        }

        res.status(201).json({
            status: 'success',
            message: 'The project has been successfully created',
            data: newProject
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//get all user projects
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            message: 'Successfully displaying all my projects',
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//get user project by id
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({ _id: id, user: req.user.id });

        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Project found',
            data: project
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//get project by username
const getProjectsByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        //find user by username
        const user = await User.find({ username }).select('_id');
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        //Take all projects related to user ID
        const projects = await Project.findOne({ user: user._id }).lean();
        res.status(200).json({
            status: 'success',
            message: `{$username}'s project found`,
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//get projects based on tags searched by users
const getProjectsByTag = async (req, res) => {
    try {
        const { tagname } = req.params;
        const projects = await Project.find({ tags: tagname }).lean();

        if (!projects || projects.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Projects found',
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//update project by id
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            { _id: id, user: req.user.id}, updates,
            {new: true, runValidators: true}
        );

        if (!updatedProject) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated the project',
            data: updatedProject
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}   

//delete project by id
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findOneAndDelete({ _id: id, user: req.user.id });

        if (!deletedProject) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the project',
            data: deletedProject
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//search projects
const searchProjects = async (req, res) => {
    try {
        const { q } = req.query;

        //Keywords are needed, so that users can search for projects.
        if (!q) {
            return res.status(400).json({
                status: 'fail',
                message: 'Search query is required'
            });
        }

        const projects = await Project.find({ $text: { $search: q } }).lean();

        if (!projects || projects.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Project found',
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

// //multer configuration for temporary storage
// const storage = multer.memoryStorage(); //save file on memory
// const upload = multer({ storage }); 

// //upload image for project

export { 
    createProject, 
    getMyProjects, 
    getProjectById, 
    getProjectsByUsername, 
    getProjectsByTag, 
    updateProject, 
    deleteProject, 
    searchProjects
};