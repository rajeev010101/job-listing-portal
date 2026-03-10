import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Applicants() {

const { jobId } = useParams();

const [applications,setApplications] = useState([]);
const [loading,setLoading] = useState(true);

const fetchApplicants = async () => {

try{

const res = await api.get(`/applications/job/${jobId}`);

setApplications(res.data);

}catch(err){

console.error(err);

}finally{
setLoading(false);
}

};

useEffect(()=>{
fetchApplicants();
},[]);


const updateStatus = async (applicationId, status) => {

  await api.put(`/applications/${applicationId}/status`, {
    status
  });

  fetchApplicants();
};

if(loading){
return <p className="p-10">Loading applicants...</p>
}


return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10 text-black dark:text-white">

<h1 className="text-3xl font-bold mb-10">
Applicants
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{applications.map((app)=>(
    
<div
key={app._id}
className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6"
>

{/* Applicant Header */}

<div className="flex items-center gap-4 mb-4">

<img
src={
app.applicant?.profile?.avatar
? `http://localhost:5000/${app.applicant.profile.avatar}`
: `https://ui-avatars.com/api/?name=${app.applicant?.name}`
}
className="w-12 h-12 rounded-full object-cover"
/>

<div>

<h2 className="font-semibold">
{app.applicant?.name}
</h2>

<p className="text-gray-400 text-sm">
{app.applicant?.email}
</p>

</div>

</div>


{/* Applicant Info */}

<div className="text-sm text-gray-500 space-y-1 mb-4">

<p>📞 {app.phone || "N/A"}</p>

<p>💼 {app.experience || "Experience not provided"}</p>

<p>🏢 {app.currentCompany || "No company listed"}</p>

<p>💰 Expected: {app.expectedSalary || "Not mentioned"}</p>

</div>


{/* Skills */}

{app.skills && (
<div className="flex flex-wrap gap-2 mb-4">

{app.skills.split(",").map((skill,index)=>(
<span
key={index}
className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
>
{skill.trim()}
</span>
))}

</div>
)}


{/* Resume */}

{app.resume && (

<a
href={`http://localhost:5000/${app.resume}`}
target="_blank"
className="block text-center bg-gray-200 dark:bg-gray-800 py-2 rounded mb-4"
>
Download Resume
</a>

)}


{/* Status */}

<div className="flex justify-between items-center">

<span
className={`text-xs px-3 py-1 rounded-full ${
app.status === "accepted"
? "bg-green-500/20 text-green-500"
: app.status === "rejected"
? "bg-red-500/20 text-red-500"
: "bg-yellow-500/20 text-yellow-500"
}`}
>
{app.status}
</span>

<div className="flex gap-2">

<button
onClick={()=>updateStatus(app._id,"accepted")}
className="bg-green-600 px-3 py-1 rounded text-sm"
>
Accept
</button>

<button
onClick={()=>updateStatus(app._id,"rejected")}
className="bg-red-600 px-3 py-1 rounded text-sm"
>
Reject
</button>

</div>

</div>

</div>

))}

</div>

</div>

);

}