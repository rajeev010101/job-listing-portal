import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {

const navigate = useNavigate();
const location = useLocation();

const role = localStorage.getItem("role");
const token = localStorage.getItem("token");

const [theme,setTheme] = useState(localStorage.getItem("theme") || "light");

useEffect(()=>{

document.documentElement.classList.toggle("dark", theme==="dark");
localStorage.setItem("theme",theme);

},[theme]);


const logout = ()=>{

localStorage.clear();
navigate("/login");

};


const linkClass = (path)=>
`px-4 py-2 rounded-lg text-sm font-medium transition
${location.pathname===path
? "bg-blue-600 text-white"
: "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
}`;


return(

<nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">

<div className="max-w-7xl mx-auto px-6">

<div className="flex items-center justify-between h-16">


{/* LOGO */}

<Link to="/" className="flex items-center gap-3">

<div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">

H

</div>

<span className="font-bold text-lg text-gray-900 dark:text-white">

Hire Hub

</span>

</Link>


{/* NAV LINKS */}

<div className="hidden md:flex items-center gap-3">

<Link to="/jobs" className={linkClass("/jobs")}>
Jobs
</Link>

<Link to="/dashboard" className={linkClass("/dashboard")}>
Dashboard
</Link>

<Link to="/notifications" className={linkClass("/notifications")}>
Notifications
</Link>

<Link to="/profile" className={linkClass("/profile")}>
Profile
</Link>

</div>


{/* RIGHT SECTION */}

<div className="flex items-center gap-3">


{/* THEME TOGGLE */}

<button

onClick={()=>setTheme(theme==="dark"?"light":"dark")}

className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"

>

{theme==="dark" ? "☀️" : "🌙"}

</button>


{/* AUTH BUTTONS */}

{token ? (

<button

onClick={logout}

className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"

>

Logout

</button>

) : (

<Link

to="/login"

className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"

>

Login

</Link>

)}

</div>

</div>

</div>

</nav>

);

}