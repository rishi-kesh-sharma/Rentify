import React from "react";
import styles from "../page/Properties";
import millify from "millify";
import { GoVerified } from "react-icons/go";
import { FcLike } from "react-icons/fc";

const PropertyContent = ({
  property: { category, price, name, location, type },
}) => {
  const handleLikeClick = () => {};
  const whatFor = "For Sale";
  const isLiked = true;
  return (
    <div>
      <div className={`${styles.text} text mt-[0.8rem]  `}>
        <div
          className={`${styles.category} ${styles.flex} flex  items-center justify-between category`}>
          <span
            className="mt-0 text-sm"
            style={{
              background: whatFor === "For Sale" ? "#25b5791a" : "#ff98001a",
              color: whatFor === "For Sale" ? "#25b579" : "#ff9800",
            }}>
            {category}
          </span>
          {isLiked ? (
            <FcLike onClick={handleLikeClick} />
          ) : (
            <FcLikePlaceholder onClick={handleLikeClick} />
          )}
        </div>
        <h4 className="text-sm">{name}</h4>
        <p className="text-xs text-gray-400">{location}</p>
      </div>
      <div
        className={`${styles.button} ${styles.flex} button flex items-center justify-between`}>
        <div>
          <button className=" px-2 py-[0.2rem] text-center font-light">
            {price}
          </button>{" "}
          <label htmlFor="" className="text-center text-gray-400">
            /sqft
          </label>
        </div>
        <span className="text-sm text-gray-400">{type}</span>
      </div>
    </div>
  );
};

export default PropertyContent;
