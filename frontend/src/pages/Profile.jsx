import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [editing, setEditing] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data.user);
      setCompletion(res.data.profileCompletion);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      profile: {
        ...user.profile,
        [e.target.name]: e.target.value,
      },
    });
  };

  const saveProfile = async () => {
    await api.put("/profile", user.profile);
    setEditing(false);
    fetchProfile();
  };

  const uploadAvatar = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    await api.post("/profile/avatar", formData);
    fetchProfile();
  };

  const uploadResume = async (e) => {
    const formData = new FormData();
    formData.append("resume", e.target.files[0]);

    await api.post("/profile/resume", formData);
    fetchProfile();
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl transition-all">

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-8">

          {/* Avatar */}
          <div className="relative">
            <img
              src={
                user.profile?.avatar
                  ? `http://localhost:5000/${user.profile.avatar}`
                  : `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-600"
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer text-xs">
              ✏
              <input type="file" hidden onChange={uploadAvatar} />
            </label>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>

            <div className="mt-2 text-sm bg-blue-600 inline-block px-3 py-1 rounded-full">
              {role}
            </div>

            {/* Profile Completion */}
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Profile Completion: {completion}%
              </p>
              <div className="w-64 bg-gray-800 rounded-full h-2 mt-1">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${completion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE FIELDS */}
        <div className="grid md:grid-cols-2 gap-6">

          {role === "jobseeker" && (
            <>
              <Field
                label="Bio"
                name="bio"
                value={user.profile?.bio}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Skills"
                name="skills"
                value={user.profile?.skills?.join(", ")}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Experience"
                name="experience"
                value={user.profile?.experience}
                editing={editing}
                onChange={handleChange}
              />

              {/* Resume Section */}
              <div>
                <label className="text-gray-400 text-sm">
                  Resume
                </label>

                {user.profile?.resume ? (
                  <a
                    href={`http://localhost:5000/${user.profile.resume}`}
                    target="_blank"
                    className="block text-blue-400 mt-1"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-gray-500">No resume uploaded</p>
                )}

                <input
                  type="file"
                  onChange={uploadResume}
                  className="mt-2 text-sm"
                />
              </div>
            </>
          )}

          {role === "employer" && (
            <>
              <Field
                label="Company Name"
                name="companyName"
                value={user.profile?.companyName}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Company Description"
                name="companyDescription"
                value={user.profile?.companyDescription}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Location"
                name="location"
                value={user.profile?.location}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Website"
                name="website"
                value={user.profile?.website}
                editing={editing}
                onChange={handleChange}
              />
            </>
          )}
        </div>

        {/* BUTTON */}
        <div className="mt-8">
          {editing ? (
            <button
              onClick={saveProfile}
              className="bg-green-600 px-6 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 px-6 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, editing, onChange }) {
  return (
    <div>
      <label className="text-gray-400 text-sm">{label}</label>
      {editing ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded"
        />
      ) : (
        <p className="mt-1">{value || "Not provided"}</p>
      )}
    </div>
  );
}