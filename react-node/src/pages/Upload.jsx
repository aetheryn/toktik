import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      const response = await fetch("http://127.0.0.1:5001/videos/videoupload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <>
      <h1>Upload page</h1>
      <div>
        <form onSubmit={submit}>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Caption"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Upload;
