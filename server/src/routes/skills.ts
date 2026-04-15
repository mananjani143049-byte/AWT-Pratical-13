import { Router, Request, Response } from 'express';
import Skill from '../models/Skill';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/skills — public
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.json(skills);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/skills — protected
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/skills/:id — protected
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
