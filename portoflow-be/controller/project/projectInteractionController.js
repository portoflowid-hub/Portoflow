import ProjectLike from '../../models/project/ProjectLike.js';
import ProjectComment from '../../models/project/ProjectComment.js';
import ProjectSaved from '../../models/project/ProjectSaved.js';
import Project from '../../models/project/Project.js';
import User from '../../models/user/User.js';

//like project (public)
const likeProject = async (req, res) => {
    const {projectId} = req.params;
    const userId = req.user.id;

    try {
        //check wheter the user has already liked it
        const existingLike = await ProjectLike.findOne({project_id: projectId}, {user_id: userId});
        if (existingLike) {
            return res.status(409).json({
                status: 'fail',
                message: 'Project already liked by this user'
            });
        }

        //create new documment like
        await ProjectLike.create({project_id: projectId}, {user_id: userId});

        //add the number of likes to the project documment
        await Project.findByIdAndUpdate(projectId, {$inc: {'stats.likesCount': 1}});

        res.status(200).json({
            status: 'success',
            message: 'Project liked successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to like project',
            error: err.message
        });
    }
}

//unlike project (public)
const unlikeProject = async (req, res) => {
    const {projectId} = req.params;
    const userId = req.user.id;

    try {
        const result = await ProjectLike.deleteOne({project_id: projectId}, {user_id: userId});

        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project like not found'
            });
        }

        //reduce the number of likes in the project
        await Project.findByIdAndUpdate({projectId}, {$inc: {'stats.likesCount': -1}})

        res.status(200).json({
            status: 'success',
            message: 'Successfully unliked project'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to unlike project',
            error: err.message
        });
    }
}