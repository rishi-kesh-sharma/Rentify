import React from "react";
import { MdCancel } from "react-icons/md";
// import styles from "../styles/FilePreview.module.css";

const FilePreview = ({ fileData }) => {
  const removeFile = (e) => {
    console.log(e.currentTarget.id);
    let fileList = fileData?.fileList?.filter((file) => {
      //   console.log(e.target.id);
      //   console.log(file.name);
      return file.name != e.target.id;
    });

    dispatch({ type: "ADD_FILE_TO_LIST", files });
  };
  return (
    <ul
      className={
        "flex flex-wrap justify-start items-center gap-[0.4rem] p-[0.8rem]"
      }>
      {fileData.fileList.map((f) => {
        const url = URL.createObjectURL(f);

        return (
          <li
            key={f.lastModified}
            className={
              "bg-green-200 flex flex-col gap-[0.3rem rounded-lg px-[0.3rem] py-[0.3rem]   w-[100px] overflow-clip"
            }>
            {/* display the filename and type */}
            <img
              src={url}
              className="object-cover h-[80px] w-[100px] rounded-lg"
            />
            <p className="text-xs">{f.name}</p>
            <MdCancel
              className="absolute text-gray-100 text-lg"
              onClick={removeFile}
              id={f.name}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FilePreview;
