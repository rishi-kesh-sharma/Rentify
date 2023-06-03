import tw from "tailwind-styled-components";

const CardContainer = tw.div`
    
    flex
    
    gap-[1rem]
    flex-row 
    flex-wrap
    items-center 
    justify-center 

${({ className }) => className}
`;
export default CardContainer;
