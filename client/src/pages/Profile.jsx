/** @format */

import React, { useEffect, useRef, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const uploadImgRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  const [showPasword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPasword);
  };
  useEffect(() => {
    if (file) {
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
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl font-semibold text-semibold
      text-center my-7"
      >
        Profile
      </h1>
      <form className="flex flex-col gap-4">
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
          onChange={""}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          onChange={""}
        />
        <div className="relative">
          <input
            type={showPasword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="p-3 border rounded-lg w-full"
            onChange={""}
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
        <button className="p-3 rounded-lg text-white bg-slate-700 hover:bg-slate-600">
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span className="text-red-700 hover:underline cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 hover:underline cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Profile;
