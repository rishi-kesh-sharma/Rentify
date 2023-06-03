import tw from "tailwind-styled-components";

const SectionWrapper = tw.section`
h-auto
w-[100%]
${({ className }) => className}
`;

export default SectionWrapper;
