import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Router CRUD generico per le entità "piatte" (task, media, letture, idee,
// reminder, progetti): lista, dettaglio, creazione, modifica, cancellazione
// soft (cestino) e ripristino.
export function crudRouter(model: string) {
  const router = express.Router();
  const db = (prisma as unknown as Record<string, any>)[model];

  router.get('/', async (_req, res) => {
    const items = await db.findMany({
      where: { deletedAt: null },
      include: { links: true, tags: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  });

  router.get('/:id', async (req, res) => {
    const item = await db.findUnique({
      where: { id: req.params.id },
      include: { links: true, tags: true },
    });
    if (!item) return res.status(404).json({ message: 'Elemento non trovato' });
    res.json(item);
  });

  router.post('/', async (req, res) => {
    try {
      const item = await db.create({ data: req.body });
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ message: 'Dati non validi', error: String(e) });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const item = await db.update({ where: { id: req.params.id }, data: req.body });
      res.json(item);
    } catch (e) {
      res.status(400).json({ message: 'Aggiornamento non riuscito', error: String(e) });
    }
  });

  // Cestino: cancellazione soft
  router.delete('/:id', async (req, res) => {
    const item = await db.update({
      where: { id: req.params.id },
      data: { deletedAt: new Date() },
    });
    res.json(item);
  });

  // Ripristino dal cestino
  router.post('/:id/ripristina', async (req, res) => {
    const item = await db.update({
      where: { id: req.params.id },
      data: { deletedAt: null },
    });
    res.json(item);
  });

  return router;
}

app.use('/api/tasks', crudRouter('task'));
app.use('/api/media', crudRouter('media'));
app.use('/api/readings', crudRouter('reading'));
app.use('/api/ideas', crudRouter('idea'));
app.use('/api/reminders', crudRouter('reminder'));
app.use('/api/projects', crudRouter('project'));

// Lista cestino: elementi eliminati di tutte le entità
app.get('/api/cestino', async (_req, res) => {
  const [tasks, media, readings, ideas, reminders, projects] = await Promise.all([
    prisma.task.findMany({ where: { deletedAt: { not: null } }, include: { links: true, tags: true } }),
    prisma.media.findMany({ where: { deletedAt: { not: null } }, include: { links: true } }),
    prisma.reading.findMany({ where: { deletedAt: { not: null } }, include: { links: true } }),
    prisma.idea.findMany({ where: { deletedAt: { not: null } }, include: { links: true, tags: true } }),
    prisma.reminder.findMany({ where: { deletedAt: { not: null } } }),
    prisma.project.findMany({ where: { deletedAt: { not: null } }, include: { links: true } }),
  ]);
  res.json([
    ...tasks.map((t: any) => ({ ...t, entity: 'task' })),
    ...media.map((m: any) => ({ ...m, entity: 'media' })),
    ...readings.map((r: any) => ({ ...r, entity: 'reading' })),
    ...ideas.map((i: any) => ({ ...i, entity: 'idea' })),
    ...reminders.map((r: any) => ({ ...r, entity: 'reminder' })),
    ...projects.map((p: any) => ({ ...p, entity: 'project' })),
  ]);
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Errore interno del server' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server MyLife Hub attivo su http://localhost:${PORT}`);
});
