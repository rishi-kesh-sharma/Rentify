const{ FcAbout } from "react-icons/fc";
const{ MdArticle, MdContactMail, MdRealEstateAgent } from "react-icons/md";
const{ AiFillHome } from "react-icons/ai";
const{ FaMoneyBillAlt, FaMoneyCheck } from "react-icons/fa";
const{ BsListNested, BsPeopleFill } from "react-icons/bs";

constLogo from "../assets/images/logo.png";

module.exports=const nav = {
  logo: { image: Logo, path: "/" },
  links: {
    leftLinks: [
      {
        name: "Buy",
        path: "/buy",
        dropItems: [
          { name: "Homes for Sale", path: "/properties" },
          { name: "Open Houses", path: "/properties" },
          { name: "New Houses", path: "/properties" },
          { name: "Recently Sold", path: "/properties" },
        ],
      },
      {
        name: "Rent",
        path: "/rent",
        dropItems: [
          { name: "All Rentals", path: "/properties" },
          { name: "Apartments For Rent", path: "/properties" },
          { name: "Houses For Rent", path: "/properties" },
          { name: "Post A Rental Listing", path: "/dashboard/properties/add" },
        ],
      },
      {
        name: "Mortgage",
        path: "mortgage",
        dropItems: [
          { name: "Mortgage overview", path: "/mortgage/overview" },
          { name: "Get Pre-Qualified", path: "/mortgage/prequalified" },
          { name: "Mortgage Rates", path: "/mortgage/rates" },
          { name: "Refinance Rates", path: "/mortgage/refinance/rates" },
          { name: "Mortgage Calculator", path: "/mortgage/calculator" },
          {
            name: "Affordibility Calculator",
            path: "/mortgage/affordibility/calculator",
          },
          {
            name: "Refinance Calculator",
            path: "/mortgage/refinance/calculator",
          },
        ],
      },
    ],
    rightLinks: [
      {
        name: "Sign up or Log in",
        path: "/auth",
        isButton: true,
        forAuthenticated: false,
      },
    ],
    sideBarLinks: [
      {
        icon: <FcAbout />,
        name: "About",
        path: "/about",
      },
      {
        icon: <MdArticle />,
        name: "Blogs",
        path: "/blogs",
      },
      {
        icon: <MdRealEstateAgent />,
        name: "Agencies",
        path: "/agencies",
      },
      {
        icon: <FaMoneyCheck />,
        name: "Buy",
        path: "/buy",
        dropItems: [
          { name: "Homes for Sale", path: "/properties" },
          { name: "Open Houses", path: "/properties" },
          { name: "New Houses", path: "/properties" },
          { name: "Recently Sold", path: "/properties" },
        ],
      },
      {
        icon: <AiFillHome />,
        name: "Rent",
        path: "/rent",
        dropItems: [
          { name: "All Rentals", path: "/properties" },
          { name: "Apartments For Rent", path: "/properties" },
          { name: "Houses For Rent", path: "/properties" },
          { name: "Post A Rental Listing", path: "/properties" },
        ],
      },
      {
        icon: <FaMoneyBillAlt />,
        name: "Mortgage",
        path: "mortgage",
        dropItems: [
          { name: "Mortgage overview", path: "/mortgage/overview" },
          { name: "Get Pre-Qualified", path: "/mortgage/prequalified" },
          { name: "Mortgage Rates", path: "/mortgage/rates" },
          { name: "Refinance Rates", path: "/mortgage/refinance/rates" },
          { name: "Mortgage Calculator", path: "/mortgage/calculator" },
          {
            name: "Affordibility Calculator",
            path: "/mortgage/affordibility/calculator",
          },
          {
            name: "Refinance Calculator",
            path: "/mortgage/refinance/calculator",
          },
        ],
      },
      {
        icon: <BsPeopleFill />,
        name: "Local Info",
        path: "/local-info",
        dropItems: [
          {
            name: "All Neighbourhood Guides",
            path: "/neighbourhood/guides",
          },
        ],
      },
      {
        icon: <BsListNested />,
        name: "Additional Resources",
        path: "/additional-resources",
        dropItems: [
          {
            name: "Our Blogs",
            path: "/blogs",
          },
          {
            name: "Help Center",
            path: "/help",
          },
        ],
      },
      {
        icon: <MdContactMail />,
        name: "Contact",
        path: "/contact",
      },
    ],
  },
};

module.exports=const profileLinks = [
  {
    name: "Profile",
    path: "/dashboard/profile",
  },

  {
    name: "Saved Properties",
    path: "/dashboard/properties/saved",
    forAuthenticated: true,
  },
  {
    name: "Saved Properties",
    path: "/dashboard/properties/searched",
  },
  {
    name: "Logout",
  },
];
