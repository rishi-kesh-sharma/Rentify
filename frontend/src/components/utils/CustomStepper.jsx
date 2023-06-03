import React from "react";
import { Step, Stepper } from "react-form-stepper";

const CustomStepper = ({ activeStep, steps, setPage }) => {
  const handleClick = (e) => {
    console.log(e.currentTarget);
    setPage(parseInt(e.currentTarget.id));
  };
  return (
    <Stepper
      activeStep={activeStep}
      connectorStateColors
      //   nonLinear={true}
      connectorStyleConfig={{
        size: 3,
        completedColor: "black",
        disabledColor: "#c8ccc9",
      }}
      styleConfig={{
        size: 50,
        inactiveBgColor: "#d2fadc",
        completedBgColor: "green",
        activeBgColor: "red",
        activeTextColor: "white",
        inactiveTextColor: "black",
      }}>
      <Step
        // color="green"
        label="Basic Informtion"
        onClick={handleClick}
        id={0}
      />
      <Step label="Property Information" onClick={handleClick} id={1} />
      <Step label="Media" onClick={handleClick} id={2} />
    </Stepper>
  );
};

export default CustomStepper;
