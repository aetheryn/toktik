import React, { useContext, useEffect, useRef, useState } from "react";
import "./Upload.css";
import UserContext from "../context/user";

const Upload = () => {
  const userCtx = useContext(UserContext);

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);

  const inputRef = useRef();
  // to track progress bar
  const [progress, setProgress] = useState(0);
  // to track upload status - "select", "uploading", "done"
  const [uploadStatus, setUploadStatus] = useState("select");

  // post to backend
  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fileName", file);
    formData.append("title", title);
    formData.append("username", userCtx.username);

    try {
      const res = await fetch("http://127.0.0.1:6001/videos/videoupload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  // handle on change for file upload
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  }, [file]);

  return (
    <>
      <div className="container">
        <form onSubmit={submit}>
          <input
            ref={inputRef}
            onChange={handleFileChange}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
          ></input>
          {!file && (
            <button className="file-btn" onClick={onChooseFile}>
              Upload File
            </button>
          )}

          {file && (
            <>
              <h1>Video Preview</h1>
              <video src={preview} style={{ width: 200, height: 200 }} />

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                style={{ color: "black" }}
              ></input>
            </>
          )}

          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default Upload;
