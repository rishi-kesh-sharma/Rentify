import React from "react";

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className="back w-[97%] mx-auto rounded-2xl overflow-hidden">
        <div className="container flex flex-col gap-[2rem] absolute">
          <span className="text-lg text-gray-300">{name}</span>
          <h1 className="text-4xl">{title}</h1>
        </div>
        <img src={cover} alt="" className="rounded-lg h-[80vh]" />
      </div>
    </>
  );
};

export default Back;
