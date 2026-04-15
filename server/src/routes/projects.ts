import { Router, Request, Response } from 'express';
import Project from '../models/Project';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/projects — public
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects — protected
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/projects/:id — protected
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) { res.status(404).json({ message: 'Project not found' }); return; }
    res.json(project);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/projects/:id — protected
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
