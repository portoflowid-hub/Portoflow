import mongoose from 'mongoose';

const projectCommentSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    commentText: {
        type: String,
        required: true
    },
    parrentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ProjectComment'
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const ProjectComment = mongoose.model('ProjectComment', projectCommentSchema);

export default ProjectComment;