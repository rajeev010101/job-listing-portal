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

  const fetchProfile = async ()=>{
    const res = await api.get("/profile");
    setUser(res.data.user);
    setCompletion(res.data.profileCompletion);
  };

  const handleChange = (e)=>{
    setUser({
      ...user,
      profile:{
        ...user.profile,
        [e.target.name]:e.target.value
      }
    });
  };

  const saveProfile = async ()=>{
    await api.put("/profile",user.profile);
    setEditing(false);
    fetchProfile();
  };

  const uploadAvatar = async(e)=>{
    const formData = new FormData();
    formData.append("avatar",e.target.files[0]);
    await api.post("/profile/avatar",formData);
    fetchProfile();
  };

  const uploadResume = async(e)=>{
    const formData = new FormData();
    formData.append("resume",e.target.files[0]);
    await api.post("/profile/resume",formData);
    fetchProfile();
  };

  if(!user) return (
    <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
      Loading...
    </div>
  );

  return (

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-6 text-gray-900 dark:text-gray-100">

<div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">

{/* COVER */}
<div className="h-44 bg-gradient-to-r from-blue-600 to-purple-600"></div>

<div className="px-8 pb-10">

{/* HEADER */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 -mt-20">

<div className="flex items-center gap-6">

<div className="relative">

<img
src={
user.profile?.avatar
? `http://localhost:5000/${user.profile.avatar}`
: `https://ui-avatars.com/api/?name=${user.name}`
}
alt="avatar"
className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow"
/>

<label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow">
📷
<input type="file" hidden onChange={uploadAvatar}/>
</label>

</div>

<div>

<h2 className="text-2xl font-bold">{user.name}</h2>
<p className="text-gray-600 dark:text-gray-400">{user.email}</p>

<span className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
{role}
</span>

{/* PROFILE COMPLETION */}
<div className="mt-3 w-56">

<p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
Profile Completion {completion}%
</p>

<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
<div
className="h-2 bg-green-500"
style={{width:`${completion}%`}}
></div>
</div>

</div>

</div>

</div>

</div>


{/* PROFILE GRID */}
<div className="grid md:grid-cols-2 gap-8 mt-10">

<Field label="Bio" name="bio" value={user.profile?.bio} editing={editing} onChange={handleChange}/>
<Field label="Experience" name="experience" value={user.profile?.experience} editing={editing} onChange={handleChange}/>
<Field label="Education" name="education" value={user.profile?.education} editing={editing} onChange={handleChange}/>

<Field label="LinkedIn" name="linkedin" value={user.profile?.linkedin} editing={editing} onChange={handleChange}/>
<Field label="Github" name="github" value={user.profile?.github} editing={editing} onChange={handleChange}/>
<Field label="Portfolio" name="portfolio" value={user.profile?.portfolio} editing={editing} onChange={handleChange}/>

</div>


{/* SKILLS */}
<div className="mt-12">

<h3 className="text-xl font-semibold mb-3">Skills</h3>

{editing ? (

<input
type="text"
name="skills"
value={user.profile?.skills || ""}
onChange={handleChange}
placeholder="Node.js, React, MongoDB..."
className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg"
/>

):( 

<div className="flex flex-wrap gap-2">

{user.profile?.skills?.length > 0 ?

user.profile.skills.map((skill,i)=>(
<span
key={i}
className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
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

</div>


{/* RESUME */}
{role==="jobseeker" && (

<div className="mt-12">

<h3 className="text-xl font-semibold mb-2">Resume</h3>

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
className="mt-3 text-sm"
/>

</div>

)}


{/* BUTTON */}
<div className="mt-12">

{editing ?

<button
onClick={saveProfile}
className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
>
Save Profile
</button>

:

<button
onClick={()=>setEditing(true)}
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
>
Edit Profile
</button>

}

</div>

</div>

</div>

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

<p className="mt-2 text-gray-800 dark:text-gray-200">
{value || "Not provided"}
</p>

}

</div>

);

}