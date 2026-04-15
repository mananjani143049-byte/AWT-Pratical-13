import { Router, Request, Response } from 'express';
import Message from '../models/Message';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/messages — public (contact form)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ message: 'All fields required' });
      return;
    }
    const msg = new Message({ name, email, subject, message });
    await msg.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/messages — protected
router.get('/', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/messages/:id/read — protected
router.patch('/:id/read', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'Marked as read' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/messages/:id — protected
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
