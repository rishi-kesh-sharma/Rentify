import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <div className="heading flex gap-[0.5rem] items-center justify-center flex-col">
        <h1 className="text-lg">{title}</h1>
        <p className="text-gray-500 text-sm max-w-[400px]">{subtitle}</p>
      </div>
    </>
  );
};

export default Heading;
