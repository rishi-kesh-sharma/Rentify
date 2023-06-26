constReact from "react";
const{ Title, TitleLogo } from "./Title";
// const{ Title, TitleLogo } from "./common/Title";

const Banner = () => {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div>
            <Title title="We are looking forward to start a new project" />{" "}
            <br />
            <TitleLogo title="Lets take your business to the next level!" />
          </div>
          <div>
            <button className="">Request a call-back</button>
          </div>
        </div>
      </section>
    </>
  );
};

module.exports= Banner;
