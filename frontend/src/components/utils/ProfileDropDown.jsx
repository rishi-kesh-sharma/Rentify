import ProfileAvatar from "./ProfileAvatar";
import { useCookies } from "react-cookie";
import { logoutFunctionality } from ".";

const ProfileDropDown = ({ profileLinks, isAuthenticated, profile }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const handleClick = (e) => {
    e.currentTarget.parentNode.lastChild.classList.toggle("hidden");
  };
  const handleLogout = async (e) => {};
  return (
    <div className="relative cursor-pointer">
      <div
        className="flex items-center justify-center gap-[0.4rem] cursor-pointer hover:bg-gray-100 rounded-lg"
        onClick={handleClick}>
        <ProfileAvatar profile={profile} />
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
      </div>
      <ul
        id="dropdown-example"
        className="hidden absolute bg-white left-0 w-[200px] rounded-lg overflow-hidden">
        {profileLinks.map((dropItem) => {
          return !dropItem.path ? (
            <li className="border border-gray-100" onClick={handleLogout}>
              <div class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 rounded-lg pl-[1rem] group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                {dropItem.name}
              </div>
            </li>
          ) : (
            <li className="border border-gray-100">
              <a
                href={dropItem.path}
                // href={""}
                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 rounded-lg pl-[1rem] group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                {dropItem.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProfileDropDown;
