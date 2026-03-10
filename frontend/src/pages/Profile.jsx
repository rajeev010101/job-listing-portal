import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {

const [user,setUser] = useState(null);
const [editing,setEditing] = useState(false);
const [completion,setCompletion] = useState(0);

const role = localStorage.getItem("role");

useEffect(()=>{
fetchProfile();
},[]);

const fetchProfile = async()=>{
const res = await api.get("/profile");
setUser(res.data.user);
setCompletion(res.data.profileCompletion);
};

const handleChange=(e)=>{
setUser({
...user,
profile:{
...user.profile,
[e.target.name]:e.target.value
}
});
};

const saveProfile=async()=>{
await api.put("/profile",user.profile);
setEditing(false);
fetchProfile();
};

const uploadAvatar=async(e)=>{
const formData=new FormData();
formData.append("avatar",e.target.files[0]);
await api.post("/profile/avatar",formData);
fetchProfile();
};

const uploadResume=async(e)=>{
const formData=new FormData();
formData.append("resume",e.target.files[0]);
await api.post("/profile/resume",formData);
fetchProfile();
};

if(!user){
return(
<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white">
Loading profile...
</div>
);
}

return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-6">

<div className="max-w-6xl mx-auto space-y-8">

{/* PROFILE CARD */}

<div className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 overflow-hidden">

{/* COVER */}

<div className="h-44 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

<div className="px-8 pb-8">

{/* HEADER */}

<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 -mt-16">

<div className="flex items-center gap-6">

<div className="relative">

<img
src={
user.profile?.avatar
? `http://localhost:5000/${user.profile.avatar}`
: `https://ui-avatars.com/api/?name=${user.name}`
}
className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow object-cover"
/>

<label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
📷
<input type="file" hidden onChange={uploadAvatar}/>
</label>

</div>

<div>

<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
{user.name}
</h2>

<p className="text-gray-500 dark:text-gray-400">
{user.email}
</p>

<span className="inline-block mt-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
{role}
</span>

{/* COMPLETION BAR */}

<div className="mt-3 w-60">

<p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
Profile Completion {completion}%
</p>

<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">

<div
className="h-2 bg-green-500 transition-all"
style={{width:`${completion}%`}}
></div>

</div>

</div>

</div>

</div>

{/* EDIT BUTTON */}

<button
onClick={()=>editing?saveProfile():setEditing(true)}
className={`px-6 py-2 rounded-lg text-white ${
editing
? "bg-green-600 hover:bg-green-700"
: "bg-blue-600 hover:bg-blue-700"
}`}
>
{editing?"Save Profile":"Edit Profile"}
</button>

</div>

</div>

</div>

{/* PROFILE DETAILS */}

<div className="grid md:grid-cols-2 gap-8">

<Card title="Professional Info">

<Field label="Bio" name="bio" value={user.profile?.bio} editing={editing} onChange={handleChange}/>
<Field label="Experience" name="experience" value={user.profile?.experience} editing={editing} onChange={handleChange}/>
<Field label="Education" name="education" value={user.profile?.education} editing={editing} onChange={handleChange}/>

</Card>

<Card title="Social Links">

<Field label="LinkedIn" name="linkedin" value={user.profile?.linkedin} editing={editing} onChange={handleChange}/>
<Field label="Github" name="github" value={user.profile?.github} editing={editing} onChange={handleChange}/>
<Field label="Portfolio" name="portfolio" value={user.profile?.portfolio} editing={editing} onChange={handleChange}/>

</Card>

</div>

{/* SKILLS */}

<Card title="Skills">

{editing ? (

<input
type="text"
name="skills"
value={user.profile?.skills || ""}
onChange={handleChange}
placeholder="Node.js, React, MongoDB..."
className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg"
/>

) : (

<div className="flex flex-wrap gap-2">

{user.profile?.skills?.length>0 ?

user.profile.skills.map((skill,i)=>(
<span
key={i}
className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
>
{skill}
</span>
))

:

<span className="text-gray-500 dark:text-gray-400">
No skills added
</span>

}

</div>

)}

</Card>

{/* RESUME */}

{role==="jobseeker" &&(

<Card title="Resume">

{user.profile?.resume ?

<a
href={`http://localhost:5000/${user.profile.resume}`}
target="_blank"
rel="noreferrer"
className="text-blue-600 hover:underline"
>
View Resume
</a>

:

<p className="text-gray-500 dark:text-gray-400">
No resume uploaded
</p>

}

<input
type="file"
onChange={uploadResume}
className="mt-3"
/>

</Card>

)}

</div>

</div>

);

}


function Card({title,children}){

return(

<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow p-6 space-y-4">

<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
{title}
</h3>

{children}

</div>

);

}


function Field({label,name,value,editing,onChange}){

return(

<div>

<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
{label}
</label>

{editing ?

<input
type="text"
name={name}
value={value || ""}
onChange={onChange}
className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg"
/>

:

<p className="mt-1 text-gray-800 dark:text-gray-200">
{value || "Not provided"}
</p>

}

</div>

);

}