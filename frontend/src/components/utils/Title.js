module.exports=const TitleLogo = ({ title, caption, className }) => {
  return (
    <h1 className={`${className}  title-logo`}>
      <span>{caption}</span>
      {title}
    </h1>
  );
};

module.exports=const TitleSm = ({ title }) => {
  return <h1 className="titleSm">{title}</h1>;
};
module.exports=const Title = ({ title, className }) => {
  return <h1 className={`${className} title`}>{title}</h1>;
};
