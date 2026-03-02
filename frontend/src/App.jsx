import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-all duration-300">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
