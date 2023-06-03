import React, { useContext, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { nav } from "../../data/index";
import Section from "../../components/utils/Section";
import Container from "../../components/utils/Container";
import LeftNavLinks from "./LeftNavLinks";
import ToggleNavigation from "./ToggleNavigation";
import RightNavLinks from "./RightNavLinks";
import SectionWrapper from "../../components/utils/SectionWrapper";
import "./index.css";

const Header = () => {
  // TOGGLE SIDEBAR
  const [show, setShow] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("lg");
  let profileData = {
    isAuthenticated: true,
    profile: {
      name: "Rishikesh Sharma",
      email: "rishi@gmail.com",
      about_me: "this is rishikesh sharma",
      dob: "2000-07-09",
      profile_image:
        "https://xsgames.co/randomusers/assets/avatars/male/74.jpg",
      profile: { mobile: "9877543210" },
      gender: "male",
    },
  };
  // HANDLE SCREEN RESIZE
  const handleResize = (e) => {
    if (window.innerWidth >= 1024) return setCurrentDevice("lg");
    if (window.innerWidth < 768) return setCurrentDevice("sm");
    if (window.innerWidth >= 768 && window.innerWidth < 1024)
      return setCurrentDevice("md");
  };

  // HANDLE NAVLINKS CLICK
  const handleNavLinksClick = (e) => {
    setShow(false);
  };

  // HANDLE MENU TOGGLE
  const handleToggle = (e) => {
    setShow(!show);
  };

  // USEEFFECT
  useEffect(() => {
    // LISTENING TO RESIZE EVENT
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return (
    <SectionWrapper className="h-[70px] ">
      <Section className=" fixed bg-white shadow-md" style={{ zIndex: 1000 }}>
        <Container className="  flex justify-between items-center h-[70px]  ">
          <div className="flex items-center gap-3">
            <a href={nav.logo.path}>
              <img
                src={nav.logo.image}
                height={60}
                width={60}
                alt="Logo"
                className=""
              />
            </a>

            {/* LEFT NAVIGATION LINKS */}
            {currentDevice == "lg" && (
              <LeftNavLinks
                links={nav?.links?.leftLinks}
                handleNavLinksClick={handleNavLinksClick}
              />
            )}
          </div>

          {/* RIGHT NAVIGATION LINKS */}
          <div className="flex gap-4">
            {currentDevice == "lg" && (
              <RightNavLinks
                handleNavLinksClick={handleNavLinksClick}
                links={nav?.links?.rightLinks}
                isAuthenticated={profileData?.isAuthenticated}
                profile={profileData?.profile}
              />
            )}
            <FiMenu
              className="text-[3rem] cursor-pointer p-[0.5rem] hover:bg-gray-100 rounded-full"
              onClick={handleToggle}
            />
          </div>
          {/* sidebar for small device  and medium device*/}
          {show &&
            (currentDevice == "sm" ||
              currentDevice == "md" ||
              currentDevice == "lg") && (
              <ToggleNavigation
                links={nav?.links?.sideBarLinks}
                handleNavLinksClick={handleNavLinksClick}
                show={show}
                setShow={setShow}
                isAuthenticated={profileData?.isAuthenticated}
                profile={profileData?.profile}
              />
            )}
        </Container>
        {/* <Container><BreadCrumbContainer /></Container> */}
      </Section>
    </SectionWrapper>
  );
};

export default Header;
