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

  const [loading, setLoading] = useState(false);
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
    const formErrors = { ...errors };

    const {
      password,
      confirm_password,
      username,
      first_name,
      last_name,
      email,
    } = data;

    const passwordsMatch = password === confirm_password;
    if (!passwordsMatch) {
      formErrors["confirm_password"] = "Passwords must match";
    }
    if (password.length < 4 || password.length > 18) {
      formErrors["password"] =
        "Passwords must be between 4 and 18 characters long";
    }
    if (username.length < 4 || username.length > 14) {
      formErrors["username"] =
        "Usernames must be between 4 and 14 characters long";
    }
    if (first_name.length < 2 || first_name.length > 14) {
      formErrors["first_name"] =
        "First name must be between 2 and 14 characters long";
    }
    if (last_name.length < 2 || last_name.length > 14) {
      formErrors["last_name"] =
        "Last name must be between 2 and 14 characters long";
    }
    if (email.length < 4 || email.length > 14) {
      // TODO: add actual validation for email
      formErrors["email"] = "Email must be between 4 and 14 characters long";
    }

    console.log("FILTERED VALUES:", Object.values(formErrors).filter(Boolean));
    if (Object.values(formErrors).filter(Boolean).length) {
      setErrors(formErrors);
      return false;
    }

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
        <Button onClick={handleSubmit} rounded="full" variant="solid-blue">
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
