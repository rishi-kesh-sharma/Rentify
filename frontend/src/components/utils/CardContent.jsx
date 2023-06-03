import tw from "tailwind-styled-components";

const CardContent = tw.div`
 flex
 flex-col
 flex-wrap
 ${({className})=>className}
 
 
`;
export default CardContent;
