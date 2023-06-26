constReact, { useContext } from "react";
const{ BiHeartCircle } from "react-icons/bi";

const PropertyLikes = () => {
  const propertyLikes = 10;
  const handleLikeClick = (e) => {};
  return (
    <div
      onClick={handleLikeClick}
      className="cursor-pointer hover:bg-gray-100 rounded-full  p-[0.6rem] hover:-rotate-[360deg] transition-all  duration-500">
      <div className=" relative p-[0.1rem] rounded-full border-[2px] border-solid border-gray-300">
        <BiHeartCircle className="text-[2rem] text-green-600 " />
        <div className="absolute bg-red-500 text-sm top-[-0.2rem] right-[-1rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full text-gray-200">
          {propertyLikes}
        </div>
      </div>
    </div>
  );
};
module.exports= PropertyLikes;
