import { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {

const [notifications,setNotifications] = useState([]);
const [loading,setLoading] = useState(true);

const fetchNotifications = async()=>{

try{

const res = await api.get("/notifications");
setNotifications(res.data);

}catch{

alert("Login required");

}finally{

setLoading(false);

}

};

useEffect(()=>{
fetchNotifications();
},[]);


const markRead = async(id)=>{

await api.put(`/notifications/${id}/read`);

setNotifications(prev =>
prev.map(note =>
note._id === id ? {...note,read:true} : note
)
);

};


if(loading){

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white">

Loading notifications...

</div>

);

}


return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-6">

<div className="max-w-4xl mx-auto">

{/* HEADER */}

<div className="mb-8">

<h1 className="text-3xl font-bold text-gray-900 dark:text-white">

Notifications

</h1>

<p className="text-gray-600 dark:text-gray-400 text-sm">

Stay updated with your job applications and activity

</p>

</div>


{/* EMPTY STATE */}

{notifications.length === 0 && (

<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-10 text-center shadow">

<p className="text-gray-500 dark:text-gray-400">

No notifications yet.

</p>

</div>

)}


{/* NOTIFICATION LIST */}

<div className="space-y-4">

{notifications.map(note => (

<div

key={note._id}

className={`p-5 rounded-xl border shadow-sm transition hover:shadow-md flex justify-between items-start gap-6

${note.read
? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
}

`}

>

{/* MESSAGE */}

<div className="flex gap-3 items-start">

{/* UNREAD DOT */}

{!note.read && (

<span className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-600"></span>

)}

<div>

<p className="text-gray-900 dark:text-gray-100">

{note.message}

</p>

<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">

{new Date(note.createdAt).toLocaleString()}

</p>

</div>

</div>


{/* BUTTON */}

{!note.read && (

<button

onClick={()=>markRead(note._id)}

className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg"

>

Mark Read

</button>

)}

</div>

))}

</div>

</div>

</div>

);

}