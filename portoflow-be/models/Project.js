import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Project title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    projectUrl: {
        type: String,
        required: true
    },
    tags: [String]
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;