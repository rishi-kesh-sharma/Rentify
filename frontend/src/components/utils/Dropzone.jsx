import React from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import { FaUpload } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import Container from "./Container";
// import styles from "../styles/DropZone.module.css";

const DropZone = ({ data, dispatch }) => {
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  // to handle file uploads
  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList;
    // initialize formData object
    const formData = new FormData();
    // loop over files and add to formData
    files.forEach((file) => formData.append("files", file));

    // Upload the files as a POST request to the server using fetch
    // Note: /api/fileupload is not a real endpoint, it is just an example
    const response = await fetch("/api/fileupload", {
      method: "POST",
      body: formData,
    });

    //successful file upload
    if (response.ok) {
      alert("Files uploaded successfully");
    } else {
      // unsuccessful file upload
      alert("Error uploading files");
    }
  };
  return (
    <Container
      className={
        "bg-gray-100 min-h-[300px] w-full rounded-lg flex justify-center items-center flex-col ga-[1rem]"
      }>
      <div
        className="flex justify-center items-center gap-[0.7rem] flex-col w-full px-[0.5rem] "
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}>
        <BiUpload className="text-green-600 text-[3rem]" />
        <input
          className="text-sm bg-green-600 max-w-[97px] rounded-md"
          id="fileSelect"
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">You can select multiple Files</label>
        <div className="w-full min-h-[150px] border border-dotted rounded-lg border-gray-400 bg-white flex items-center justify-center flex-wrap">
          drag &amp; drop your files here
        </div>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} dispatch={dispatch} />
      {/* {data.fileList.length > 0 && (
        <button className={"styles.uploadBtn"} onClick={uploadFiles}>
          Upload
        </button>
      )} */}
    </Container>
  );
};

export default DropZone;
