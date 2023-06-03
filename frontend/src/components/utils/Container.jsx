import tw from "tailwind-styled-components";

const Container = tw.div`
h-auto
w-[97%]
mx-auto
${({ className }) => className}
`;

export default Container;
