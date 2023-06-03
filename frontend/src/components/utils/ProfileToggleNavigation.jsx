import React from "react";
import { useCookies } from "react-cookie";

const ProfileToggleNavigation = ({ profileLinks }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const handleLogout = async () => {};
  return (
    <div>
      <ul class="space-y-2 mt-[1rem] border border-t-gray-200  border-b-gray-border-t-gray-200 border-solid ">
        {profileLinks?.map((item) => {
          return (
            <li className="border-b-[1px] border-b-gray-300">
              {item.path ? (
                <a
                  href={item?.path}
                  className="flex items-center p-2 text-base font-normal text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                  <span class="flex-1 pl-3 whitespace-nowrap">{item.name}</span>
                </a>
              ) : (
                <div
                  onClick={handleLogout}
                  className=" cursor-pointer flex items-center p-2 text-base font-normal text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileToggleNavigation;
