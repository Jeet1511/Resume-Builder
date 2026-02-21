import Resume from '../models/Resume.js';

// @desc    Create a new resume
// @route   POST /api/resumes
export const createResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            userId: req.user.id,
            ...req.body,
        });
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all resumes for current user
// @route   GET /api/resumes
export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
export const updateResume = async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Resume.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
