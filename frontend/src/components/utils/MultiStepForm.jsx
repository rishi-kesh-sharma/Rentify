// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { Form, FormElement } from "@progress/kendo-react-form";
// import { Button } from "@progress/kendo-react-buttons";
// import { Stepper } from "@progress/kendo-react-layout";

// const MultiStepForm = [AccountDetails, PersonalDetails, PaymentDetails];
// export const App = () => {
//   const [step, setStep] = React.useState(0);
//   const [formState, setFormState] = React.useState({});
//   const [steps, setSteps] = React.useState([
//     {
//       label: "Account Details",
//       isValid: undefined,
//     },
//     {
//       label: "Personal Details",
//       isValid: undefined,
//     },
//     {
//       label: "Payment Details",
//       isValid: undefined,
//     },
//   ]);
//   const lastStepIndex = steps.length - 1;
//   const isLastStep = lastStepIndex === step;
//   const isPreviousStepsValid =
//     steps
//       .slice(0, step)
//       .findIndex((currentStep) => currentStep.isValid === false) === -1;
//   const onStepSubmit = React.useCallback(
//     (event) => {
//       const { isValid, values } = event;
//       const currentSteps = steps.map((currentStep, index) => ({
//         ...currentStep,
//         isValid: index === step ? isValid : currentStep.isValid,
//       }));
//       setSteps(currentSteps);
//       setStep(() => Math.min(step + 1, lastStepIndex));
//       setFormState(values);
//       if (isLastStep && isPreviousStepsValid && isValid) {
//         alert(JSON.stringify(values));
//       }
//     },
//     [steps, isLastStep, isPreviousStepsValid, step, lastStepIndex]
//   );
//   const onPrevClick = React.useCallback(
//     (event) => {
//       event.preventDefault();
//       setStep(() => Math.max(step - 1, 0));
//     },
//     [step, setStep]
//   );
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//       }}>
//       <Stepper value={step} items={steps} />
//       <Form
//         initialValues={formState}
//         onSubmitClick={onStepSubmit}
//         render={(formRenderProps) => (
//           <div
//             style={{
//               alignSelf: "center",
//             }}>
//             <FormElement
//               style={{
//                 width: 480,
//               }}>
//               {stepPages[step]}
//               <span
//                 style={{
//                   marginTop: "40px",
//                 }}
//                 className={"k-form-separator"}
//               />
//               <div
//                 style={{
//                   justifyContent: "space-between",
//                   alignContent: "center",
//                 }}
//                 className={
//                   "k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end"
//                 }>
//                 <span
//                   style={{
//                     alignSelf: "center",
//                   }}>
//                   Step {step + 1} of 3
//                 </span>
//                 <div>
//                   {step !== 0 ? (
//                     <Button
//                       style={{
//                         marginRight: "16px",
//                       }}
//                       onClick={onPrevClick}>
//                       Previous
//                     </Button>
//                   ) : undefined}
//                   <Button
//                     themeColor={"primary"}
//                     disabled={isLastStep ? !isPreviousStepsValid : false}
//                     onClick={formRenderProps.onSubmit}>
//                     {isLastStep ? "Submit" : "Next"}
//                   </Button>
//                 </div>
//               </div>
//             </FormElement>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default MultiStepForm;
