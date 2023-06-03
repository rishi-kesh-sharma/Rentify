import tw from "tailwind-styled-components";

const Card = tw.div`
 
 
w-full
lg:min-h-[310px]
 px-[1rem]
 py-[1rem]
 rounded-lg
 flex
 flex-col
 justify-center
 items-center
 gap-[1rem]
 shadow-sm

 transition-all
 hover:shadow-md
 
 ${({ className }) => className}
`;
export default Card;
