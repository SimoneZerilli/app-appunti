import { useEffect, useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { useUiStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select, Label } from '@/components/ui/Fields';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { PRIORITA_LABEL, STATO_TASK_LABEL } from '@/lib/constants';
import type { Task, ListaTask } from '@/lib/types';

const emptyForm = {
  title: '',
  description: '',
  priority: 'media',
  list: 'oggi',
  dueDate: '',
};

/** Pagina To-do: due liste ("oggi" e "backlog") con CRUD base. */
export function TodosPage() {
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask } = useDataStore();
  const setError = useUiStore((s) => s.setError);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchTasks().catch(() => setError('Impossibile caricare i task'));
  }, [fetchTasks, setError]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setForm({
      title: task.title,
      description: task.description ?? '',
      priority: task.priority,
      list: task.list,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    });
    setModalOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim()) return;
    const data: Partial<Task> = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      priority: form.priority as Task['priority'],
      list: form.list as Task['list'],
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };
    if (editing) await updateTask(editing.id, data);
    else await createTask(data);
    setModalOpen(false);
  };

  const toggleDone = (task: Task) => {
    const completata = task.status === 'completata';
    updateTask(task.id, {
      status: completata ? 'da_fare' : 'completata',
      completedAt: completata ? null : new Date().toISOString(),
    });
  };

  const moveList = (task: Task) => {
    const nuovo: ListaTask = task.list === 'oggi' ? 'backlog' : 'oggi';
    updateTask(task.id, { list: nuovo });
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <div className="flex items-start gap-3 rounded-xl border border-border-soft bg-surface-2 p-3">
      <input
        type="checkbox"
        checked={task.status === 'completata'}
        onChange={() => toggleDone(task)}
        className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
        aria-label={`Completa ${task.title}`}
      />
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            task.status === 'completata' ? 'text-zinc-500 line-through' : 'text-zinc-100'
          }`}
        >
          {task.title}
        </p>
        {task.description && <p className="mt-0.5 text-xs text-zinc-400">{task.description}</p>}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
          <span
            className={`rounded-full px-2 py-0.5 ${
              task.priority === 'alta'
                ? 'bg-red-900/50 text-red-200'
                : task.priority === 'media'
                  ? 'bg-amber-900/40 text-amber-200'
                  : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            {PRIORITA_LABEL[task.priority]}
          </span>
          <span className="rounded-full bg-surface-3 px-2 py-0.5 text-zinc-300">
            {STATO_TASK_LABEL[task.status]}
          </span>
          {task.dueDate && (
            <span className="text-zinc-500">
              Scadenza: {new Date(task.dueDate).toLocaleDateString('it-IT')}
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-1">
        <button
          onClick={() => moveList(task)}
          className="rounded-lg px-2 py-1 text-xs text-zinc-400 hover:bg-surface-3 hover:text-zinc-100"
          title={task.list === 'oggi' ? 'Sposta nel backlog' : 'Sposta in "oggi"'}
        >
          {task.list === 'oggi' ? '→ Backlog' : '→ Oggi'}
        </button>
        <button
          onClick={() => openEdit(task)}
          className="rounded-lg px-2 py-1 text-xs text-zinc-400 hover:bg-surface-3 hover:text-zinc-100"
        >
          Modifica
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="rounded-lg px-2 py-1 text-xs text-red-300 hover:bg-red-900/40"
        >
          Elimina
        </button>
      </div>
    </div>
  );

  const oggi = tasks.filter((t) => t.list === 'oggi');
  const backlog = tasks.filter((t) => t.list === 'backlog');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">To-do</h2>
        <Button onClick={openCreate}>+ Nuovo task</Button>
      </div>

      {loading && tasks.length === 0 ? (
        <p className="text-sm text-zinc-500">Caricamento…</p>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="Nessun task presente"
          description="Crea il primo task con il pulsante «Nuovo task»."
        />
      ) : (
        <>
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-300">Cose da fare oggi ({oggi.length})</h3>
            {oggi.length === 0 ? (
              <EmptyState title="Niente per oggi" description="Goditi la giornata o sposta qui un task dal backlog." />
            ) : (
              oggi.map((t) => <TaskCard key={t.id} task={t} />)
            )}
          </section>
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-300">Backlog ({backlog.length})</h3>
            {backlog.length === 0 ? (
              <EmptyState title="Backlog vuoto" description="Sposta qui i task meno prioritari." />
            ) : (
              backlog.map((t) => <TaskCard key={t.id} task={t} />)
            )}
          </section>
        </>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Modifica task' : 'Nuovo task'}
        onClose={() => setModalOpen(false)}
      >
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div>
            <Label>Titolo</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Cosa devi fare?"
              autoFocus
            />
          </div>
          <div>
            <Label>Descrizione (opzionale)</Label>
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Priorità</Label>
              <Select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                {Object.entries(PRIORITA_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Lista</Label>
              <Select value={form.list} onChange={(e) => setForm({ ...form, list: e.target.value })}>
                <option value="oggi">Oggi</option>
                <option value="backlog">Backlog</option>
              </Select>
            </div>
          </div>
          <div>
            <Label>Scadenza (opzionale)</Label>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Annulla
            </Button>
            <Button type="submit">{editing ? 'Salva' : 'Crea task'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

