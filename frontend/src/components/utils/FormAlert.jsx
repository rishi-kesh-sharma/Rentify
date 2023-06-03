import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function AlertPop(props) {
  return (
    <Alert
      my={1}
      status="error"
      variant="left-accent"
      className="my-[1rem] text-red-500 text-sm">
      <AlertIcon className="h-[1rem]" />
      <AlertTitle mr={2} className="">
        {props.title}
      </AlertTitle>
    </Alert>
  );
}
