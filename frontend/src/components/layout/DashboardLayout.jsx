import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
