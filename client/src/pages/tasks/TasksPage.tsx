import Footer from "@/components/layout/Footer";
import Navigation from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Bell, BellOff, CheckCircle2, ClipboardList, PlusCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const NOTIFICATION_PREF_KEY = "taskNotificationsEnabled";

export default function Tasks() {
  // Internal tool - redirect non-admin users
  if (typeof window !== "undefined" && !window.location.search.includes("admin=true")) {
    window.location.href = "/";
    return null;
  }
  const utils = trpc.useUtils();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const notificationsSupported =
    typeof window !== "undefined" && "Notification" in window;

  const { data: tasks = [], isLoading } = trpc.tasks.list.useQuery();
  const createTask = trpc.tasks.create.useMutation({
    onSuccess: async () => {
      await utils.tasks.list.invalidate();
    },
  });

  const completeTask = trpc.tasks.complete.useMutation({
    onSuccess: async () => {
      await utils.tasks.list.invalidate();
    },
  });

  const updateTaskStatus = trpc.tasks.updateStatus.useMutation({
    onSuccess: async () => {
      await utils.tasks.list.invalidate();
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(NOTIFICATION_PREF_KEY);
    if (saved === "true") {
      setNotificationsEnabled(true);
    }
  }, []);

  const completedTasks = useMemo(
    () => tasks.filter(task => task.status === "completed"),
    [tasks]
  );

  const inProgressTasks = useMemo(
    () => tasks.filter(task => task.status === "in_progress"),
    [tasks]
  );

  const pendingOnlyTasks = useMemo(
    () => tasks.filter(task => task.status === "pending"),
    [tasks]
  );

  const requestPermissionAndEnable = async () => {
    if (!notificationsSupported) {
      toast.error("Browser notifications are not supported on this device.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      window.localStorage.setItem(NOTIFICATION_PREF_KEY, "true");
      toast.success("Task notifications enabled.");
      return;
    }

    setNotificationsEnabled(false);
    window.localStorage.setItem(NOTIFICATION_PREF_KEY, "false");
    toast.warning("Notification permission was not granted.");
  };

  const handleNotificationToggle = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(NOTIFICATION_PREF_KEY, "false");
      }
      toast.info("Task notifications disabled.");
      return;
    }

    if (!notificationsSupported) {
      toast.error("Browser notifications are not supported on this device.");
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
      window.localStorage.setItem(NOTIFICATION_PREF_KEY, "true");
      toast.success("Task notifications enabled.");
      return;
    }

    await requestPermissionAndEnable();
  };

  const maybeSendCompletionNotification = (taskTitle: string) => {
    if (!notificationsSupported || !notificationsEnabled) return;
    if (Notification.permission !== "granted") return;

    new Notification("Task completed", {
      body: `${taskTitle} has been marked as completed.`,
    });
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      toast.error("Please enter a task title.");
      return;
    }

    try {
      await createTask.mutateAsync({
        title: trimmedTitle,
        description: trimmedDescription || undefined,
      });

      setTitle("");
      setDescription("");
      toast.success("Task created successfully.");
    } catch (error) {
      toast.error("Failed to create task. Please try again.");
    }
  };

  const handleCompleteTask = async (taskId: number, taskTitle: string) => {
    try {
      const result = await completeTask.mutateAsync({ id: taskId });
      if (!result.success) {
        toast.error(result.message || "Failed to complete task.");
        return;
      }

      toast.success("Task marked as completed.");
      maybeSendCompletionNotification(taskTitle);
    } catch (error) {
      toast.error("Failed to complete task. Please try again.");
    }
  };

  const handleMoveToInProgress = async (taskId: number) => {
    try {
      const result = await updateTaskStatus.mutateAsync({
        id: taskId,
        status: "in_progress",
      });
      if (!result.success) {
        toast.error(result.message || "Failed to move task.");
        return;
      }
      toast.success("Task moved to in progress.");
    } catch (error) {
      toast.error("Failed to move task. Please try again.");
    }
  };

  const handleMoveToPending = async (taskId: number) => {
    try {
      const result = await updateTaskStatus.mutateAsync({
        id: taskId,
        status: "pending",
      });
      if (!result.success) {
        toast.error(result.message || "Failed to update task.");
        return;
      }
      toast.success("Task moved back to pending.");
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Tasks</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Track counseling, documentation, and admission steps in one place.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 border-0 bg-gradient-to-br from-purple-50 to-blue-50 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-[#17337d]" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <p className="text-gray-600 mb-6">
              Get a browser alert whenever a task is completed.
            </p>
            <Button
              type="button"
              onClick={handleNotificationToggle}
              variant={notificationsEnabled ? "outline" : "default"}
              className={notificationsEnabled ? "w-full" : "w-full bg-[#17337d] hover:bg-[#091f54]"}
            >
              {notificationsEnabled ? "Disable Notifications" : "Enable Notifications"}
            </Button>
            {!notificationsSupported && (
              <p className="text-sm text-red-600 mt-4">
                This browser does not support Notification API.
              </p>
            )}
          </Card>

          <Card className="p-6 border-0 bg-white shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Task title"
                maxLength={180}
                required
              />
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description (optional)"
                maxLength={1200}
                className="w-full min-h-28 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button
                type="submit"
                disabled={createTask.isPending}
                className="bg-[#17337d] hover:bg-[#091f54]"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                {createTask.isPending ? "Creating..." : "Add Task"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 border-0 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-5 h-5 text-[#17337d]" />
              <h3 className="text-xl font-bold text-gray-900">Pending</h3>
            </div>
            {isLoading ? (
              <p className="text-gray-600">Loading tasks...</p>
            ) : pendingOnlyTasks.length === 0 ? (
              <p className="text-gray-600">No pending tasks yet.</p>
            ) : (
              <div className="space-y-4">
                {pendingOnlyTasks.map(task => (
                  <div key={task.id} className="p-4 rounded-lg bg-white border border-gray-200">
                    <p className="font-semibold text-gray-900">{task.title}</p>
                    {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                    <div className="mt-3 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={updateTaskStatus.isPending}
                        onClick={() => handleMoveToInProgress(task.id)}
                        aria-label={`Move ${task.title} to in progress`}
                      >
                        Start Task
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="bg-[#17337d] hover:bg-[#091f54]"
                        disabled={completeTask.isPending}
                        onClick={() => handleCompleteTask(task.id, task.title)}
                        aria-label={`Mark ${task.title} as complete`}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 border-0 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">In Progress</h3>
            </div>
            {isLoading ? (
              <p className="text-gray-600">Loading tasks...</p>
            ) : inProgressTasks.length === 0 ? (
              <p className="text-gray-600">No tasks in progress.</p>
            ) : (
              <div className="space-y-4">
                {inProgressTasks.map(task => (
                  <div key={task.id} className="p-4 rounded-lg bg-white border border-blue-200">
                    <p className="font-semibold text-gray-900">{task.title}</p>
                    {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                    <div className="mt-3 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={updateTaskStatus.isPending}
                        onClick={() => handleMoveToPending(task.id)}
                        aria-label={`Move ${task.title} back to pending`}
                      >
                        Move to Pending
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="bg-[#17337d] hover:bg-[#091f54]"
                        disabled={completeTask.isPending}
                        onClick={() => handleCompleteTask(task.id, task.title)}
                        aria-label={`Mark ${task.title} as complete`}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 border-0 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Completed</h3>
            </div>
            {isLoading ? (
              <p className="text-gray-600">Loading tasks...</p>
            ) : completedTasks.length === 0 ? (
              <p className="text-gray-600">No completed tasks yet.</p>
            ) : (
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <div key={task.id} className="p-4 rounded-lg bg-white border border-green-200">
                    <p className="font-semibold text-gray-900">{task.title}</p>
                    {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                    {task.completedAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Completed on {new Date(task.completedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}