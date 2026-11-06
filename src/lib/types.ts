// Tipi condivisi del dominio MyLife Hub

export type Priorita = 'bassa' | 'media' | 'alta';
export type StatoTask = 'da_fare' | 'in_corso' | 'completata';
export type ListaTask = 'oggi' | 'backlog';

export interface LinkItem {
  id: string;
  url: string;
  label?: string | null;
  kind: 'youtube' | 'instagram' | 'generico';
  taskId?: string | null;
  ideaId?: string | null;
  mediaId?: string | null;
  readingId?: string | null;
  projectId?: string | null;
}

export interface TagItem {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: Priorita;
  status: StatoTask;
  list: ListaTask;
  dueDate?: string | null;
  completedAt?: string | null;
  order: number;
  tags: TagItem[];
  links: LinkItem[];
  projectId?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  title: string;
  type: 'film' | 'serie' | 'anime';
  status: 'da_vedere' | 'in_corso' | 'completato';
  rating?: number | null;
  platform?: string | null;
  notes?: string | null;
  completedAt?: string | null;
  links: LinkItem[];
  deletedAt?: string | null;
  createdAt: string;
}

export interface Reading {
  id: string;
  title: string;
  author?: string | null;
  type: 'libro' | 'manga';
  status: 'da_leggere' | 'in_corso' | 'completato';
  totalPages?: number | null;
  currentPage?: number | null;
  rating?: number | null;
  notes?: string | null;
  completedAt?: string | null;
  links: LinkItem[];
  deletedAt?: string | null;
  createdAt: string;
}

export interface Idea {
  id: string;
  title: string;
  content?: string | null;
  category?: string | null;
  status: 'bozza' | 'da_esplorare' | 'archiviata';
  tags: TagItem[];
  links: LinkItem[];
  deletedAt?: string | null;
  createdAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string | null;
  dueAt: string;
  recurrence: 'mai' | 'giornaliera' | 'settimanale' | 'mensile';
  status: 'attivo' | 'completato' | 'scaduto';
  completedAt?: string | null;
  deletedAt?: string | null;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: 'idea' | 'in_corso' | 'in_pausa' | 'completato' | 'abbandonato';
  dueDate?: string | null;
  notes?: string | null;
  links: LinkItem[];
  tasks?: Task[];
  deletedAt?: string | null;
  createdAt: string;
}

/** Rileva il tipo di link dall'URL. */
export function detectLinkKind(url: string): LinkItem['kind'] {
  if (/youtube\.com|youtu\.be/i.test(url)) return 'youtube';
  if (/instagram\.com/i.test(url)) return 'instagram';
  return 'generico';
}
