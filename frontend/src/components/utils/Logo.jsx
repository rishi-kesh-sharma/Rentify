constReact from "react";
constImage from "next/image";
const Logo = ({ className, alt, height, width, LogoImage }) => {
  return (
    <Image
      src={LogoImage}
      width={width}
      height={height}
      alt={alt}
      className={`h-[2rem] w-[5rem] ${className} object-contain`}
    />
  );
};

module.exports= Logo;
