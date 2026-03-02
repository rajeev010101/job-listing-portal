import { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch {
      alert("Login required");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((note) =>
        note._id === id ? { ...note, read: true } : note
      )
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet.</p>
      )}

      <div className="space-y-4 max-w-3xl">
        {notifications.map((note) => (
          <div
            key={note._id}
            className={`p-6 rounded-xl border ${
              note.read
                ? "bg-gray-900 border-gray-800"
                : "bg-blue-900/20 border-blue-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <p>{note.message}</p>

              {!note.read && (
                <button
                  onClick={() => markRead(note._id)}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  Mark as Read
                </button>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
