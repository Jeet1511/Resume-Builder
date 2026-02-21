import express from 'express';
import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from '../controllers/resumeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // All resume routes require auth

router.route('/').post(createResume).get(getResumes);
router.route('/:id').get(getResumeById).put(updateResume).delete(deleteResume);

export default router;
