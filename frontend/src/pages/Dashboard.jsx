import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";

export default function Dashboard() {

const [data,setData] = useState(null);

useEffect(()=>{

const fetchDashboard = async()=>{

try{

const role = localStorage.getItem("role");

if(role==="employer"){

const res = await api.get("/dashboard/employer");
setData({role:"employer",...res.data});

}else{

const res = await api.get("/dashboard/jobseeker");
setData({role:"jobseeker",...res.data});

}

}catch(err){

console.error(err);

}

};

fetchDashboard();

},[]);


if(!data){

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">

<p className="text-lg text-gray-700 dark:text-gray-300 animate-pulse">

Loading dashboard...

</p>

</div>

);

}


return(

<DashboardLayout>

<div className="space-y-10">

{data.role==="employer"

? <EmployerDashboard data={data}/>

: <JobSeekerDashboard data={data}/>

}

<AnalyticsCharts data={data} role={data.role}/>

</div>

</DashboardLayout>

);

}



function EmployerDashboard({data}){

return(

<>

{/* HEADER */}

<div className="flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold mb-2">

Employer Dashboard

</h1>

<p className="text-gray-600 dark:text-gray-400">

Manage job listings and track applicants

</p>

</div>

<a

href="/manage-jobs"

className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

>

Manage Jobs

</a>

</div>



{/* STATS */}

<div className="grid md:grid-cols-3 gap-6">

<StatCard title="Jobs Posted" value={data.jobsPosted || 0} icon="💼"/>

<StatCard title="Total Jobs" value={data.jobs?.length || 0} icon="📄"/>

<StatCard title="Account Status" value="Active" icon="✅"/>

</div>



{/* JOB LIST */}

<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow p-8">

<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">

Your Jobs

</h2>

{data.jobs?.length===0 &&(

<p className="text-gray-500 dark:text-gray-400">

No jobs posted yet.

</p>

)}

<div className="space-y-4">

{data.jobs?.map(job=>(

<motion.div

key={job._id}

whileHover={{scale:1.02}}

className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex justify-between items-center"

>

<div>

<h3 className="font-semibold text-gray-900 dark:text-white">

{job.title}

</h3>

<p className="text-sm text-gray-500 dark:text-gray-400">

📍 {job.location}

</p>

</div>

<span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">

Active

</span>

</motion.div>

))}

</div>

</div>

</>

);

}



function JobSeekerDashboard({data}){

return(

<>

{/* HEADER */}

<div>

<h1 className="text-4xl font-bold mb-2">

My Dashboard

</h1>

<p className="text-gray-600 dark:text-gray-400">

Track your job applications

</p>

</div>



{/* STATS */}

<div className="grid md:grid-cols-2 gap-6">

<StatCard title="Applications Sent" value={data.totalApplications || 0} icon="📨"/>

<StatCard title="Profile Status" value="Active" icon="👤"/>

</div>



{/* APPLICATIONS */}

<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow p-8">

<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">

Recent Applications

</h2>

{data.applications?.length===0 &&(

<p className="text-gray-500 dark:text-gray-400">

No applications yet.

</p>

)}

<div className="space-y-4">

{data.applications?.map(app=>(

<motion.div

key={app._id}

whileHover={{scale:1.02}}

className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex justify-between items-center"

>

<div>

<h3 className="font-semibold text-gray-900 dark:text-white">

{app.job?.title}

</h3>

<p className="text-sm text-gray-500 dark:text-gray-400">

📍 {app.job?.location}

</p>

</div>

<StatusBadge status={app.status}/>

</motion.div>

))}

</div>

</div>

</>

);

}



function StatCard({title,value,icon}){

return(

<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow rounded-xl p-6 flex justify-between items-center">

<div>

<p className="text-sm text-gray-500 dark:text-gray-400">

{title}

</p>

<p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">

{value}

</p>

</div>

<div className="text-3xl">

{icon}

</div>

</div>

);

}



function StatusBadge({status}){

const styles={

pending:"bg-yellow-500 text-white",

accepted:"bg-green-600 text-white",

rejected:"bg-red-600 text-white"

};

return(

<span

className={`px-4 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-600 text-white"}`}

>

{status}

</span>

);

}