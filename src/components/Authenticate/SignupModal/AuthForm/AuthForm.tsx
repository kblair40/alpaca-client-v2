import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Text,
  Heading,
  Flex,
  Center,
  Button,
  Stack,
} from "@chakra-ui/react";

import { toTitleCase } from "utils/helpers";
import api from "api";

type Props = {
  variant: "signin" | "signup";
  onSubmit?: (data: any) => void;
};

const AuthForm = ({ variant, onSubmit }: Props) => {
  let inputs =
    variant === "signup"
      ? [
          "first_name",
          "last_name",
          "username",
          "email",
          "password",
          "confirm_password",
        ]
      : ["username", "password"];

  let defaultFormData: { [key: string]: string } = {};
  inputs.forEach((inp) => {
    defaultFormData[inp] = "";
  });

  const [formData, setFormData] = useState<any>(defaultFormData);
  // const [formData, setFormData] = useState<any>(
  //   inputs.map((inp) => ({ [`${inp}`]: "" }))
  // );

  const handleSubmit = () => {
    console.log("FORM DATA:", formData);
  };

  return (
    <React.Fragment>
      {inputs.map((inp, i) => {
        return (
          <FormControl isRequired key={i}>
            <FormLabel>
              {toTitleCase(inp, inp.includes("_") ? "_" : " ")}
            </FormLabel>
            <Input
              id={inp}
              value={formData[inp]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [`${inp}`]: e.target.value,
                })
              }
            />
          </FormControl>
        );
      })}
    </React.Fragment>
  );
};

export default AuthForm;
