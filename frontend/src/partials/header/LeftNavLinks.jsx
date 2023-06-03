import React from "react";

const LeftNavLinks = ({ links, handleNavLinksClick }) => {
  return (
    <>
      <ul class="flex gap-[1rem] ">
        {links?.map((item) => {
          return !item.dropItems ? (
            <li className="mt-0 relative border" onClick={handleNavLinksClick}>
              <a
                href="#"
                class="h-full  flex items-center p-2  text-lg text-gray-600   rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap ">{item.name}</span>
              </a>
            </li>
          ) : (
            <li
              className="relative px-[0.3rem] py-[0.5rem] text-gray-600  hover:bg-gray-100 rounded-lg "
              onClick={handleNavLinksClick}>
              <button
                onClick={(e) => {
                  e.currentTarget.parentNode.lastChild.classList.toggle(
                    "hidden"
                  );
                }}
                type="button"
                class="flex items-center w-full px-2 text-[1rem]   text-gray-600 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example">
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item>
                  {item.name}
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className="hidden absolute bg-white left-0 w-[200px] top-[2.5rem] rounded-lg overflow-hidden  shadow-md">
                {item.dropItems.map((dropItem) => {
                  return (
                    <li
                      onClick={handleNavLinksClick}
                      className="border border-solid border-gray-100">
                      <a
                        href={dropItem.path}
                        className="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 rounded-lg pl-[1rem] group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        {dropItem.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default LeftNavLinks;
