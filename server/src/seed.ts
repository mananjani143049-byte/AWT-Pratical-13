import User from './models/User';
import Project from './models/Project';
import Skill from './models/Skill';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export async function seedDatabase() {
  try {
    // Seed admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      await User.create({ email: adminEmail, password: adminPassword });
      console.log('✅ Admin user seeded');
    }

    // Seed projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'AlphaMetrics',
          description: 'A full-featured Indian paper trading platform with real-time market data simulation, portfolio tracking, and P&L analytics. Built for traders who want to practice without risking capital.',
          tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'WebSockets', 'TailwindCSS'],
          github: 'https://github.com/krunalvalvi/alphametrics',
          live: '',
          featured: true,
          order: 1,
        },
        {
          title: 'Portfolio CMS',
          description: 'This very portfolio — a full-stack Next.js + Express application with a headless admin dashboard, JWT auth, and MongoDB data layer.',
          tags: ['Next.js', 'Express', 'MongoDB', 'TypeScript', 'JWT'],
          github: 'https://github.com/krunalvalvi/portfolio',
          live: '',
          featured: false,
          order: 2,
        },
        {
          title: 'Stockify',
          description: 'Stock market dashboard integrating Yahoo Finance API for live quotes, charts, and watchlist management. Replaced Fyers API with a more accessible data source.',
          tags: ['React', 'Node.js', 'Yahoo Finance API', 'Chart.js'],
          github: 'https://github.com/krunalvalvi/stockify',
          live: '',
          featured: false,
          order: 3,
        },
        {
          title: 'Lavle Design',
          description: 'Premium B2B printing e-commerce platform for a Rajkot-based business. Navy & Gold design system with product catalog, admin panel, and Supabase backend.',
          tags: ['React', 'Vite', 'Supabase', 'Framer Motion', 'TailwindCSS'],
          github: '',
          live: '',
          featured: false,
          order: 4,
        },
      ]);
      console.log('✅ Projects seeded');
    }

    // Seed skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        // Backend
        { name: 'Node.js', level: 85, category: 'Backend' },
        { name: 'Express.js', level: 82, category: 'Backend' },
        { name: 'FastAPI', level: 65, category: 'Backend' },
        { name: 'Python', level: 70, category: 'Backend' },
        // Frontend
        { name: 'React', level: 80, category: 'Frontend' },
        { name: 'Next.js', level: 78, category: 'Frontend' },
        { name: 'TypeScript', level: 75, category: 'Frontend' },
        { name: 'TailwindCSS', level: 88, category: 'Frontend' },
        // Database
        { name: 'MongoDB', level: 80, category: 'Database' },
        { name: 'PostgreSQL', level: 70, category: 'Database' },
        { name: 'Supabase', level: 65, category: 'Database' },
        // Tools
        { name: 'Git & GitHub', level: 85, category: 'Tools' },
        { name: 'Docker', level: 55, category: 'Tools' },
        { name: 'REST APIs', level: 88, category: 'Tools' },
      ]);
      console.log('✅ Skills seeded');
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
}
