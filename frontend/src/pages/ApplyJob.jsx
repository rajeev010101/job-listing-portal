import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ApplyJob() {

const { jobId } = useParams();
const navigate = useNavigate();

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
city:"",
country:"",
experience:"",
currentCompany:"",
expectedSalary:"",
noticePeriod:"",
skills:"",
coverLetter:""
});

const [resume,setResume] = useState(null);
const [loading,setLoading] = useState(false);
const [success,setSuccess] = useState("");
const [error,setError] = useState("");

const inputStyle =
"p-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{
e.preventDefault();

setLoading(true);
setError("");
setSuccess("");

try{

const formData = new FormData();

Object.keys(form).forEach((key)=>{
formData.append(key,form[key]);
});

if(resume){
formData.append("resume",resume);
}

await api.post(`/applications/apply/${jobId}`,formData,{
headers:{
"Content-Type":"multipart/form-data"
}
});

setSuccess("Application submitted successfully!");

setTimeout(()=>{
navigate("/jobs");
},2000);

}catch(err){
setError(err.response?.data?.error || "Failed to submit application");
}
finally{
setLoading(false);
}

};

return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-start py-10 px-4">

<div className="w-full max-w-3xl bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">

<h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
Apply for this Job
</h1>

{error && (
<div className="bg-red-500/20 text-red-500 p-3 rounded mb-4">
{error}
</div>
)}

{success && (
<div className="bg-green-500/20 text-green-500 p-3 rounded mb-4">
{success}
</div>
)}

<form onSubmit={handleSubmit} className="grid gap-5">

<input
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
required
className={inputStyle}
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
className={inputStyle}
/>

<input
name="phone"
placeholder="Phone"
value={form.phone}
onChange={handleChange}
required
className={inputStyle}
/>

<div className="grid grid-cols-2 gap-4">

<input
name="city"
placeholder="City"
value={form.city}
onChange={handleChange}
className={inputStyle}
/>

<input
name="country"
placeholder="Country"
value={form.country}
onChange={handleChange}
className={inputStyle}
/>

</div>

<div className="grid grid-cols-2 gap-4">

<input
name="experience"
placeholder="Experience (ex: 2 years)"
value={form.experience}
onChange={handleChange}
className={inputStyle}
/>

<input
name="currentCompany"
placeholder="Current Company"
value={form.currentCompany}
onChange={handleChange}
className={inputStyle}
/>

</div>

<div className="grid grid-cols-2 gap-4">

<input
name="expectedSalary"
placeholder="Expected Salary"
value={form.expectedSalary}
onChange={handleChange}
className={inputStyle}
/>

<input
name="noticePeriod"
placeholder="Notice Period"
value={form.noticePeriod}
onChange={handleChange}
className={inputStyle}
/>

</div>

<input
name="skills"
placeholder="Skills (React, Node, etc)"
value={form.skills}
onChange={handleChange}
className={inputStyle}
/>

<textarea
name="coverLetter"
placeholder="Cover Letter"
rows="4"
value={form.coverLetter}
onChange={handleChange}
className={inputStyle}
/>

<div>

<label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
Upload Resume
</label>

<input
type="file"
onChange={(e)=>setResume(e.target.files[0])}
required
className="text-gray-700 dark:text-gray-300"
/>

</div>

<button
type="submit"
disabled={loading}
className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
>

{loading ? "Submitting..." : "Submit Application"}

</button>

</form>

</div>

</div>

);

}