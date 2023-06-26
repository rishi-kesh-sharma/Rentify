consttw from "tailwind-styled-components";

const SectionWrapper = tw.section`
h-auto
w-[100%]
${({ className }) => className}
`;

module.exports= SectionWrapper;
