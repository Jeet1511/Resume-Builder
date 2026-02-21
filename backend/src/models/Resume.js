import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        default: 'Untitled Resume',
    },
    templateId: {
        type: Number,
        required: true,
        default: 1,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    personalInfo: {
        fullName: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' },
        github: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
    },
    summary: {
        type: String,
        default: '',
    },
    experience: [{
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
    }],
    education: [{
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        field: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        gpa: { type: String, default: '' },
    }],
    skills: [{
        name: { type: String, default: '' },
        level: { type: String, default: 'Intermediate' },
    }],
    projects: [{
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: { type: String, default: '' },
        link: { type: String, default: '' },
    }],
    certifications: [{
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
    }],
    languages: [{
        name: { type: String, default: '' },
        proficiency: { type: String, default: 'Intermediate' },
    }],
    customSections: [{
        title: { type: String, default: '' },
        items: [{
            label: { type: String, default: '' },
            value: { type: String, default: '' },
        }],
    }],
}, {
    timestamps: true,
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
