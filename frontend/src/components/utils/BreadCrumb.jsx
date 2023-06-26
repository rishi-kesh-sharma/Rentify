const{ Children } from "react";
const{ Fragment } from "react";
constContainer from "./Container";
constSection from "./Section";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span>/</span>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <Section className="pt-[1.5rem]  bg-gray-100  md:text-lg">
      <Container className="mx-auto  flex items-center" aria-label="breadcrumb">
        <ol className="flex justify-start items-start space-x-2 flex-wrap">
          {childrenWtihSeperator}
        </ol>
      </Container>
    </Section>
  );
};

module.exports= Breadcrumb;
