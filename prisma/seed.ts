// Seed minimo: un paio di task di esempio per verificare la Milestone 1.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.task.count();
  if (count > 0) {
    console.log('Database già popolato, seed ignorato.');
    return;
  }
  await prisma.task.createMany({
    data: [
      { title: 'Esplora MyLife Hub', description: 'Primo task di esempio creato dal seed.', priority: 'media', list: 'oggi' },
      { title: 'Idea: organizzare la settimana', description: 'Task di esempio nel backlog.', priority: 'bassa', list: 'backlog' },
    ],
  });
  console.log('Seed completato: 2 task di esempio creati.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
