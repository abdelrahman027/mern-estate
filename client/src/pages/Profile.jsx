/** @format */

import { useEffect, useRef, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import UserListings from "../components/UserListings";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const uploadImgRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(formData);
  const dispatch = useDispatch();
  const [showPasword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPasword);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (file)
    {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false)
      {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error)
    {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try
    {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false)
      {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error)
    {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleLogout = async () => {
    try
    {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/logout");
      console.log(res);
      const data = await res.json();
      if (data.success === false)
      {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess());
    } catch (error)
    {
      dispatch(logoutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg md:max-w-3xl mx-auto">
      <h1
        className="text-3xl font-semibold text-semibold
      text-center my-7"
      >
        Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* My Listings */}
        <div className="text-center mt-20">
          <h1 className="text-xl font-semibold">Your Listings</h1>
          <div>
            <UserListings />
          </div>
        </div>
        {/* Profile Info form*/}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            name=""
            id=""
            hidden
            accept="image/*"
            ref={uploadImgRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            onClick={() => uploadImgRef.current.click()}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer"
          />
          <div className="text-sm text-center">
            {fileUploadError ? (
              <p className="text-red-700"> Error Uploading image</p>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <p>... loading {filePercentage}%</p>
            ) : filePercentage == 100 ? (
              <p className="text-green-700">Uploading avatar success</p>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="p-3 border rounded-lg"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="p-3 border rounded-lg"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPasword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="p-3 border rounded-lg w-full"
              onChange={handleChange}
            />
            <div
              className="absolute top-3 text-slate-200 cursor-pointer hover:text-slate-300 right-2"
              onClick={handleShowPassword}
            >
              {showPasword ? (
                <BiShow className="h-7 w-7" />
              ) : (
                <BiHide className="h-7 w-7" />
              )}
            </div>
          </div>
          <button
            disabled={loading}
            className="p-3 rounded-lg text-white bg-slate-700 hover:bg-slate-600 uppercase"
          >
            {loading ? "...loading" : "Update"}
          </button>
          <Link
            to={"/create-listing"}
            className="bg-green-700 text-white text-center p-3 rounded-lg uppercase hover:bg-green-600"
          >
            create listing
          </Link>
          {error && <p className="text-red-700">{error}</p>}
          {updateSuccess && (
            <p className="text-green-700">Successfully Updated!</p>
          )}
          <div className="flex justify-between items-center mt-4">
            <span
              onClick={handleDeleteUser}
              className="text-red-700 hover:underline cursor-pointer"
            >
              Delete Account
            </span>
            <span
              onClick={handleLogout}
              className="text-red-700 hover:underline cursor-pointer"
            >
              Logout
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
