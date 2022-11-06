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

const AuthForm = ({ variant, onClose }: Props) => {
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

  const defaultFormData: { [key: string]: string } = {};
  inputs.forEach((inp) => (defaultFormData[inp] = ""));

  const [formData, setFormData] = useState<any>(defaultFormData);

  const handleSubmit = () => {
    console.log("FORM DATA:", formData);
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

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant="ghost">Secondary Action</Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default AuthForm;
