'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/LogoutButton';
import { useLanguage } from '@/context/LanguageContext';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

export default function DashboardPage() {
  useAuth();
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fetchingTasks, setFetchingTasks] = useState(true);
  const [savingTask, setSavingTask] = useState(false);
  const [taskActionId, setTaskActionId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setError('');
      setFetchingTasks(true);
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      setError(t.fetchTasksError);
    } finally {
      setFetchingTasks(false);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setSavingTask(true);
      await api.post('/tasks', {
        title,
        description,
      });
      setTitle('');
      setDescription('');
      await fetchTasks();
    } catch (error) {
      console.error(error);
      setError(t.fetchTasksError);
    } finally {
      setSavingTask(false);
    }
  };

  const toggleTaskStatus = async (id: number, currentStatus: string) => {
    try {
      setError('');
      setTaskActionId(id);
      await api.put(`/tasks/${id}`, {
        status: currentStatus === 'pending' ? 'completed' : 'pending',
      });
      await fetchTasks();
    } catch (error) {
      console.error(error);
      setError(t.fetchTasksError);
    } finally {
      setTaskActionId(null);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setError('');
      setTaskActionId(id);
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error(error);
      setError(t.fetchTasksError);
    } finally {
      setTaskActionId(null);
    }
  };

  const isTaskLoading = (id: number) => taskActionId === id;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">{t.dashboardTitle}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{t.dashboardTitle}</h1>
              <p className="mt-3 max-w-2xl text-slate-400">{t.dashboardSubtitle}</p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <span className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_1fr]">
          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_24px_56px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">{t.createTaskButton}</h2>
              </div>
              {savingTask && (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                  <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-emerald-400" />
                  Saving...
                </div>
              )}
            </div>

            <form className="space-y-4" onSubmit={createTask}>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder={t.taskTitlePlaceholder}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder={t.taskDescriptionPlaceholder}
                  className="min-h-[140px] w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={savingTask}
                className="inline-flex items-center justify-center rounded-3xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingTask ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-emerald-700" />
                    {t.createTaskButton}
                  </span>
                ) : (
                  t.createTaskButton
                )}
              </button>
            </form>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_24px_56px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">{t.dashboardTitle}</h2>
              {fetchingTasks && (
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-2 text-sm text-slate-200">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                  {t.loadingTasks}
                </span>
              )}
            </div>

            {error ? (
              <div className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <div className="space-y-4">
              {fetchingTasks && tasks.length === 0 ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-28 animate-pulse rounded-3xl bg-slate-800/70" />
                ))
              ) : tasks.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-center text-slate-400">
                  {t.noTasksYet}
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{task.description || 'No description provided.'}</p>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-sm ${task.status === 'completed' ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-700/60 text-slate-200'}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => toggleTaskStatus(task.id, task.status)}
                        disabled={!!taskActionId}
                        className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isTaskLoading(task.id) ? t.taskActionWorking : t.toggleStatus}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        disabled={!!taskActionId}
                        className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isTaskLoading(task.id) ? t.taskActionWorking : t.deleteTask}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
