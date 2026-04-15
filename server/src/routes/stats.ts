import { Router, Request, Response } from 'express';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Message from '../models/Message';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/stats — protected
router.get('/', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const [projects, skills, messages, unreadMessages] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
    ]);
    res.json({ projects, skills, messages, unreadMessages });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
