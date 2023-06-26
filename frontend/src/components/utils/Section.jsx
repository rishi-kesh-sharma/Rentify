consttw from "tailwind-styled-components";

const Section = tw.section`
h-auto
w-[100%]
${({ className }) => className}
`;

module.exports= Section;
