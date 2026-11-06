// Etichette e costanti in italiano per l'interfaccia.

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard' },
  { path: '/todo', label: 'To-do' },
  { path: '/palestra', label: 'Palestra' },
  { path: '/media', label: 'Media' },
  { path: '/letture', label: 'Letture' },
  { path: '/idee', label: 'Idee' },
  { path: '/reminder', label: 'Reminder' },
  { path: '/progetti', label: 'Progetti' },
  { path: '/cestino', label: 'Cestino' },
  { path: '/impostazioni', label: 'Impostazioni' },
] as const;

export const PRIORITA_LABEL: Record<string, string> = {
  bassa: 'Bassa',
  media: 'Media',
  alta: 'Alta',
};

export const STATO_TASK_LABEL: Record<string, string> = {
  da_fare: 'Da fare',
  in_corso: 'In corso',
  completata: 'Completata',
};

export const STATO_MEDIA_LABEL: Record<string, string> = {
  da_vedere: 'Da vedere',
  in_corso: 'In corso',
  completato: 'Completato',
};

export const STATO_LETTURA_LABEL: Record<string, string> = {
  da_leggere: 'Da leggere',
  in_corso: 'In corso',
  completato: 'Completato',
};

export const CATEGORIA_IDEA_LABEL: Record<string, string> = {
  personale: 'Personale',
  lavoro: 'Lavoro',
  progetto: 'Progetto',
  viaggio: 'Viaggio',
  acquisto: 'Acquisto',
  altro: 'Altro',
};

export const RECURRENCE_LABEL: Record<string, string> = {
  mai: 'Mai',
  giornaliera: 'Giornaliera',
  settimanale: 'Settimanale',
  mensile: 'Mensile',
};

export const ENTITY_LABEL: Record<string, string> = {
  task: 'Task',
  media: 'Media',
  reading: 'Lettura',
  idea: 'Idea',
  reminder: 'Reminder',
  project: 'Progetto',
};
