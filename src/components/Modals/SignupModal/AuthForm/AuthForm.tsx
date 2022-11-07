import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Text,
  Flex,
  Button,
  Stack,
  ModalFooter,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

import { VisibleIcon, NotVisibleIcon } from "utils/icons";
import useDispatch from "hooks/useDispatch";
import { userActions } from "store/userSlice";
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

  const dispatch = useDispatch();

  const defaultFormData: FormData = {};
  inputs.forEach((inp) => (defaultFormData[inp] = ""));

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<FormData>(defaultFormData);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    console.log("FORM DATA:", formData);
    if (variant === "signup") {
      console.log("SIGNUP");
      if (dataIsValid()) {
        console.log("Data is valid");
        try {
          setLoading(true);
          const response = await api.post("/signup", formData);
          console.log("SIGNUP RESPONSE:", response.data);

          const { token, user } = response.data;

          if (token) {
            window.localStorage.setItem("auth-token", token);
          }

          if (user) {
            dispatch(
              userActions.setUserData({
                data: user,
                isAuthenticated: true,
              })
            );
          }

          setLoading(false);
          onClose();
        } catch (e: any) {
          console.log("FAILED TO SIGNUP:", e);
          if (e.response.data && e.response.data.msg) {
            setServerError(e.response.data.msg);
          }
        }
        setLoading(false);
      }
    } else {
      const { username, password } = formData;
      if (username.length >= 3 && password.length >= 3) {
        try {
          setLoading(true);
          const response = await api.post("/signin", formData);
          console.log("Signin Response:", response.data);

          const { token, user } = response.data;

          if (token) {
            window.localStorage.setItem("auth-token", token);
          }

          if (user) {
            dispatch(
              userActions.setUserData({
                data: user,
                isAuthenticated: true,
              })
            );
          }

          setLoading(false);
          onClose();
        } catch (e) {
          console.log("Failed to Sign In:", e);
        }
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const dataIsValid = () => {
    const data = { ...formData };
    const formErrors = { ...defaultFormData };

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

    if (Object.values(formErrors).filter(Boolean).length) {
      setErrors(formErrors);
      return false;
    }

    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();

    // if there is at least one error, clear all errors
    if (Object.values(errors).some((val) => !!val)) {
      setErrors(defaultFormData);
    }

    if (serverError) setServerError("");
  };

  const lightIconBg = { hover: "gray.50", active: "gray.100" };
  const darkIconBg = { hover: "gray.700", active: "gray.600" };
  const iconBg = useColorModeValue(lightIconBg, darkIconBg);

  return (
    <React.Fragment>
      <Stack spacing="12px">
        {inputs.map((inp, i) => {
          console.log("\nINP:", inp);
          console.log("Errors:", errors[inp]);
          return (
            <FormControl isRequired isInvalid={!!errors[inp]} key={i}>
              <FormLabel fontWeight={500}>
                {toTitleCase(inp, inp.includes("_") ? "_" : " ")}
              </FormLabel>

              {!inp.includes("password") ? (
                <Input
                  id={inp}
                  type="text"
                  value={formData[inp]}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`${inp}`]: e.target.value,
                    })
                  }
                />
              ) : (
                <InputGroup>
                  <Input
                    overflow="hidden"
                    id={inp}
                    onKeyDown={handleKeyDown}
                    value={formData[inp]}
                    type={
                      inp === "password" && showPassword
                        ? "text"
                        : inp === "confirm_password" && showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`${inp}`]: e.target.value,
                      })
                    }
                  />
                  <InputRightElement
                    borderRadius="0 6px 6px 0"
                    children={
                      (inp === "password" && !showPassword) ||
                      (inp === "confirm_password" && !showConfirmPassword) ? (
                        <VisibleIcon />
                      ) : (
                        <NotVisibleIcon />
                      )
                    }
                    transition="background-color 0.3s"
                    cursor="pointer"
                    _hover={{ bg: iconBg.hover }}
                    _active={{ bg: iconBg.active }}
                    onClick={() => {
                      if (inp === "password") {
                        setShowPassword((prev) => !prev);
                      } else {
                        setShowConfirmPassword((prev) => !prev);
                      }
                    }}
                  />
                </InputGroup>
              )}

              {errors[inp] && (
                <FormErrorMessage>{errors[inp]}</FormErrorMessage>
              )}
            </FormControl>
          );
        })}
      </Stack>

      <ModalFooter
        flexDirection="column"
        alignItems="stretch"
        px={0}
        mt="1.5rem"
        pb={0}
      >
        <Button
          isLoading={loading}
          onClick={handleSubmit}
          rounded="full"
          variant="solid-blue"
        >
          {variant === "signup" ? "Sign Up" : "Log In"}
        </Button>

        <Button mt=".75rem" variant="ghost" rounded="full" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default AuthForm;
