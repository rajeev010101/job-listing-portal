import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Jobs() {

const navigate = useNavigate();
const role = localStorage.getItem("role");
const token = localStorage.getItem("token");

const [jobs,setJobs] = useState([]);
const [total,setTotal] = useState(0);
const [page,setPage] = useState(1);
const [loading,setLoading] = useState(true);
const [savedJobs,setSavedJobs] = useState([]);

const [filters,setFilters] = useState({
q:"",
location:"",
minSalary:"",
maxSalary:"",
category:"",
sort:"newest"
});

const limit = 6;

const fetchJobs = async ()=>{

try{

setLoading(true);

const res = await api.get("/jobs/search",{
params:{...filters,page,limit}
});

setJobs(res.data.results);
setTotal(res.data.total);

}catch(err){

console.error(err);

}finally{
setLoading(false);
}

};

useEffect(()=>{
fetchJobs();
},[page]);


const handleSearch = (e)=>{
e.preventDefault();
setPage(1);
fetchJobs();
};


const handleApply = (jobId)=>{
if(!token) return navigate("/login");

navigate(`/apply/${jobId}`);
};


const toggleSave = (jobId)=>{

if(savedJobs.includes(jobId)){
setSavedJobs(savedJobs.filter(id=>id!==jobId));
}else{
setSavedJobs([...savedJobs,jobId]);
}

};

const totalPages = Math.ceil(total/limit);


return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10 px-6">

<div className="max-w-7xl mx-auto">

{/* HEADER */}

<div className="mb-10">

<h1 className="text-4xl font-bold mb-2">
Find Your Dream Job
</h1>

<p className="text-gray-600 dark:text-gray-400">
Browse thousands of opportunities from top companies
</p>

</div>


{/* SEARCH FILTER */}

<form
onSubmit={handleSearch}
className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-6 grid md:grid-cols-6 gap-4 mb-10"
>

<input
placeholder="Keyword"
value={filters.q}
onChange={(e)=>setFilters({...filters,q:e.target.value})}
className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
/>

<input
placeholder="Location"
value={filters.location}
onChange={(e)=>setFilters({...filters,location:e.target.value})}
className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
/>

<input
placeholder="Min Salary"
value={filters.minSalary}
onChange={(e)=>setFilters({...filters,minSalary:e.target.value})}
className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
/>

<input
placeholder="Max Salary"
value={filters.maxSalary}
onChange={(e)=>setFilters({...filters,maxSalary:e.target.value})}
className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
/>

<select
value={filters.sort}
onChange={(e)=>setFilters({...filters,sort:e.target.value})}
className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
>

<option value="newest">Newest</option>
<option value="salary-high">Salary High</option>
<option value="salary-low">Salary Low</option>

</select>

<button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
Search
</button>

</form>


{/* JOB LIST */}

{loading && (
<p className="text-center text-lg">
Loading jobs...
</p>
)}


<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{jobs.map(job=>(

<div
key={job._id}
className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
>

<div>

{/* TITLE */}

<div className="flex justify-between items-start mb-4">

<h2 className="text-xl font-semibold">
{job.title}
</h2>

<button
onClick={()=>toggleSave(job._id)}
className="text-xl"
>
{savedJobs.includes(job._id) ? "💙" : "🤍"}
</button>

</div>


{/* COMPANY LOGO */}

{job.companyLogo && (

<img
src={`http://localhost:5000/${job.companyLogo}`}
alt="logo"
className="w-14 h-14 rounded-md mb-4"
/>

)}


{/* LOCATION + SALARY */}

<div className="flex flex-wrap gap-2 mb-4">

<span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
📍 {job.location}
</span>

<span className="bg-green-200 dark:bg-green-800/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm">
💰 {job.salary}
</span>

</div>


{/* DESCRIPTION */}

<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">

{job.description.slice(0,120)}...

</p>

</div>


{/* ACTION BUTTON */}

{role==="jobseeker" ? (

<button
onClick={()=>handleApply(job._id)}
className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg transition"
>
Apply Now
</button>

):(

<button
onClick={()=>navigate(`/jobs/${job._id}`)}
className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg transition"
>
View Details
</button>

)}

</div>

))}

</div>


{/* PAGINATION */}

{totalPages>1 && (

<div className="flex justify-center gap-3 mt-12">

{Array.from({length:totalPages},(_,i)=>{

const pageNumber = i+1;

return(

<button
key={pageNumber}
onClick={()=>setPage(pageNumber)}
className={`px-4 py-2 rounded-lg ${
page===pageNumber
? "bg-blue-600 text-white"
: "bg-gray-200 dark:bg-gray-800"
}`}
>

{pageNumber}

</button>

);

})}

</div>

)}

</div>

</div>

);

}