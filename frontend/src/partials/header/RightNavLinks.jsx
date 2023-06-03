import React, { useContext } from "react";
import DropdownProfileAvatar from "../../components/utils/ProfileAvatar";
import ProfileDropDown from "../../components/utils/ProfileDropDown";
import AuthButton from "../../components/utils/AuthButton";
import { profileLinks } from "../../data/index";
import { BiHeartCircle, BiLike } from "react-icons/bi";
import PropertyLikes from "./PropertyLikes";

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

export default RightNavLinks;
