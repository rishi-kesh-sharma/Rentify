import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import RightNavLinks from "./RightNavLinks";
import ProfileAvatar from "../../components/utils/ProfileAvatar";
import ProfileToggleNavigation from "../../components/utils/ProfileToggleNavigation";
import { profileLinks } from "../../data/index";
import AuthButton from "../../components/utils/AuthButton";
const ToggleNavigation = ({
  links,
  handleNavLinksClick,
  show,
  setShow,
  profile,
  isAuthenticated,
}) => {
  const [openProfileLinks, setOpenProfileLinks] = useState(false);
  const handleLogout = (e) => {
    console.log("logout button clicked");
  };
  const handleProfileAvatarClick = (e) => {
    console.log("avatar clicked");
    setOpenProfileLinks(!openProfileLinks);
  };
  return (
    <div className=" fixed left-0 z-40  right-0 top-0 h-[100vh] shadow-2xl bg-[rgba(0,0,0,0.6)] ">
      <aside
        id="sidebar-multi-level-sidebar"
        class="w-[70vw] fixed top-0 right-0 z-40 sm:w-[50vw] h-screen sm:max-w-[300px] "
        aria-label="Sidebar">
        {show && (
          <RxCross1
            className="absolute text-red-600 top-[1rem] text-3xl  left-[0.5rem] z-50 cursor-pointer "
            onClick={(e) => setShow(false)}
          />
        )}
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 pt-[6rem]">
          {isAuthenticated ? (
            <div
              className="flex items-center justify-start gap-[1rem] cursor-pointer hover:bg-gray-100 rounded-lg"
              onClick={handleProfileAvatarClick}>
              <div className="">
                <ProfileAvatar profile={profile} />
              </div>
              <span>
                <svg
                  sidebar-toggle-item
                  className="w-6 h-6 text-gray-400 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </div>
          ) : (
            <AuthButton />
          )}
          {openProfileLinks && (
            <ProfileToggleNavigation profileLinks={profileLinks} />
          )}
          <ul class=" mt-[1rem] ">
            {links?.map((item) => {
              return !item.dropItems ? (
                <li
                  onClick={handleNavLinksClick}
                  className="border-b-[1px] w-full  border-b-gray-300 flex items-center px-[0.6rem] hover:bg-gray-100 mt-0 py-[0.3rem]">
                  {item.icon && item.icon}
                  {item.path ? (
                    <a
                      href={item?.path}
                      className="flex items-center p-2 text-base font-normal text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        {item.name}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center p-2 text-base font-normal text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  )}
                </li>
              ) : (
                <li className=" border-b-[1px] border-b-gray-300">
                  <button
                    onClick={(e) => {
                      e.currentTarget.parentNode.lastChild.classList.toggle(
                        "hidden"
                      );
                    }}
                    type="button"
                    className="flex items-center w-full p-2 py-[0.7rem] text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example">
                    {item.icon && item.icon}
                    <span
                      class="flex-1 py-[0.3] px-[0.5rem] ml-3 text-left whitespace-nowrap text-gray-600"
                      sidebar-toggle-item>
                      {item?.name}
                    </span>
                    <svg
                      sidebar-toggle-item
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <ul id="dropdown-example" className="hidden py-2">
                    {item.dropItems.map((dropItem) => {
                      return (
                        <li
                          onClick={handleNavLinksClick}
                          className="border-b-[1px] border-b-gray-300 hover:bg-gray-100 ">
                          <a
                            href={dropItem.path}
                            className="flex items-center w-full py-2 text-base font-normal text-gray-600 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
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
        </div>
      </aside>
    </div>
  );
};

export default ToggleNavigation;
