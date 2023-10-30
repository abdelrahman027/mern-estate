/** @format */

import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { BsFillTrashFill } from "react-icons/bs";

const CreateListing = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  console.log(formData);
  const handleImageSubmit = async (e) => {
    setUploading(true);
    if (
      uploadedFiles.length > 0 &&
      uploadedFiles.length + formData.imageUrls.length < 7
    ) {
      const promises = [];
      for (let i = 0; i < uploadedFiles.length; i++) {
        promises.push(storeImage(uploadedFiles[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per Image)");
          setUploading(false);
        });
    } else {
      setImageUploadError(
        "You can only update 6 images per listing at least 1 image"
      );
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPercentage(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-4 max-w-2xl md:max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="text-center grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-4">
        <div>
          {/* TEXT INPUTS */}
          <div className="flex flex-col gap-2 w-3/4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="p-3 rounded-lg"
            />
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="p-3 rounded-lg"
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="p-3 rounded-lg"
            />
          </div>
          {/* CHECK BOXES */}
          <div className="flex gap-6 itmes-center border-gray-300 border p-3 w-fit rounded-lg flex-wrap mt-4">
            <div className="flex gap-1">
              <input type="checkbox" name="sell" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="rent" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="parking" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="furnished" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="offer" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          {/* NUMBER INPUTS */}
          <div className="flex gap-4 flex-wrap  border-gray-300 border p-3 w-fit rounded-lg items-center  mt-4">
            <div className="gap-2 flex items-center" defaultValue={1}>
              <label htmlFor="beds">Beds:</label>
              <input
                type="number"
                name="bedroom"
                id="bedroom"
                className="rounded-lg p-2 w-12 border border-gray-300"
              />
            </div>
            <div className="gap-2 flex items-center" defaultValue={1}>
              <label htmlFor="bathroom">Baths:</label>
              <input
                type="number"
                name="bathroom"
                id="bathroom"
                className="rounded-lg p-2 w-12 border border-gray-300"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center border border-gray-300 w w-fit rounded-lg p-3 mt-4">
            <div className="text-center mt-4" defaultValue={1}>
              <label htmlFor="regularPrice">Regular Price: </label>
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                className="rounded-lg p-2 w-24 border border-gray-300"
              />
              <span className="text-xs opacity-50"> ($/month) </span>
            </div>
            <div className="text-center mt-4" defaultValue={1}>
              <label htmlFor="discountPrice">Discounted Price: </label>
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                className="rounded-lg p-2 w-24 border border-gray-300"
              />
              <span className="text-xs opacity-50"> ($/month) </span>
            </div>
          </div>
        </div>
        {/* input file & upload */}
        <div className="my-8">
          <p className="mb-4">
            Images:{" "}
            <span className="text-xs opacity-50">
              The first image will be the cover (max6)
            </span>{" "}
          </p>
          <div className="flex items-center gap-4 justify-center">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setUploadedFiles(e.target.files)}
              className="border border-gray-300 p-3 rounded-lg"
            />
            <button
              onClick={handleImageSubmit}
              className="uppercaswe border hover:bg-gray-200 border-green-600 text-green-600 p-3 rounded-lg disabled:opacity-50 disabled:cursor-wait"
              type="button"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="p-1 text-sm w-fit mx-auto mt-2 bg-white rounded-lg text-red-700">
              {imageUploadError}
            </p>
          )}
          {uploadPercentage > 0 && uploadPercentage !== 100 && (
            <p>{`loading ... ${uploadPercentage}%`}</p>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url + index}
                className="flex items-center justify-evenly w-1/2 mx-auto mt-2 border border-gray-300 rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt="img"
                  className="w-20 h-20 object-cover rounded-lg mt-2 overflow-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="uppercase text-gray300  p-2 bg-slate-300 rounded-lg hover:text-red-700"
                >
                  <BsFillTrashFill className="h-4 w-4" />
                </button>
              </div>
            ))}
          {/* submit button */}
          <button className="bg-slate-700 mx-auto mt-8 text-white uppercase rounded-lg hover:bg-slate-600 p-3  disabled:opacity-50 disabled:cursor-wait w-3/4">
            {" "}
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
