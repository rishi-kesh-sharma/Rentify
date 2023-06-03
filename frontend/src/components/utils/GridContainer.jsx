import tw from "tailwind-styled-components";

const GridContainer = tw.div`
w-[97%] mx-auto grid items-center justify-center sm:grid-cols-2 md:grid-cols:3 lg:grid-cols-4 2xl:grid-cols-5   gap-[2rem] mt-[2rem]
${({ className }) => className}
`;

export default GridContainer;
