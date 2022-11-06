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
  ModalFooter,
} from "@chakra-ui/react";

import { toTitleCase } from "utils/helpers";
import api from "api";

type Props = {
  variant: "signin" | "signup";
  onClose: () => void;
};

type FormData = { [key: string]: string };

const fields = {
  signup: [
    "first_name",
    "last_name",
    "username",
    "email",
    "password",
    "confirm_password",
  ],
  signin: ["username", "password"],
};

const AuthForm = ({ variant, onClose }: Props) => {
  let inputs = fields[variant];

  const defaultFormData: FormData = {};
  inputs.forEach((inp) => (defaultFormData[inp] = ""));

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<FormData>(defaultFormData);

  const handleSubmit = () => {
    console.log("FORM DATA:", formData);
    if (variant === "signup") {
      console.log("SIGNUP");
      if (dataIsValid()) {
        console.log("Data is valid");
      }
    } else {
      const { username, password } = formData;
      if (username.length >= 3 && password.length >= 3) {
        // send signup request, maybe by calling signup function
      }
    }
  };

  const signup = async () => {
    //
  };

  const signin = async () => {
    //
  };

  const dataIsValid = () => {
    const data = { ...formData };

    // const passwordsMatch =

    return true;
  };

  return (
    <React.Fragment>
      <Stack spacing="12px">
        {inputs.map((inp, i) => {
          return (
            <FormControl isRequired key={i}>
              <FormLabel fontWeight={500}>
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
      </Stack>

      <ModalFooter
        flexDirection="column"
        alignItems="stretch"
        px={0}
        mt="1.5rem"
      >
        <Button onClick={onClose} rounded="full" variant="solid-blue">
          {variant === "signup" ? "Sign Up" : "Log In"}
        </Button>
        <Button mt=".5rem" variant="ghost" rounded="full" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default AuthForm;
