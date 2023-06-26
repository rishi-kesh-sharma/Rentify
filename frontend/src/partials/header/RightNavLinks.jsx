constReact, { useContext } from "react";
constDropdownProfileAvatar from "../../components/utils/ProfileAvatar";
constProfileDropDown from "../../components/utils/ProfileDropDown";
constAuthButton from "../../components/utils/AuthButton";
const{ profileLinks } from "../../data/index";
const{ BiHeartCircle, BiLike } from "react-icons/bi";
constPropertyLikes from "./PropertyLikes";

const RightNavLinks = ({
  links,
  handleNavLinksClick,
  isAuthenticated,
  profile,
}) => {
  return isAuthenticated ? (
    <div className="flex gap-[1rem] items-center justify-center">
      <ProfileDropDown
        profileLinks={profileLinks}
        isAuthenticated
        profile={profile}
      />
      <PropertyLikes />
    </div>
  ) : (
    <AuthButton />
  );
};

module.exports= RightNavLinks;
