import { extendTheme } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const inputHelpers = createMultiStyleConfigHelpers([
  "addon",
  "field",
  "element",
]);
const selectHelpers = createMultiStyleConfigHelpers(["icon", "field"]);

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      base: "#1A5CFB",
      50: "#d9e4fe",
      100: "#b3c9fe",
      200: "#8cadfd",
      300: "#6692fc",
      400: "#4077fc",
      500: "#1A5CFB",
      600: "#0443da",
      700: "#0332a3",
      800: "#02216d",
      900: "#011136",
    },
    alpaca: {
      base: "#FCD72B",
      50: "#FCE26A",
      100: "#FCDF5D",
      200: "#FCDD51",
      300: "#FCDB44",
      400: "#FCD838",
      500: "#FCD72B",
      600: "#FCD421",
      700: "#FCD217",
      800: "#FCD00D",
      900: "#FCCF03",
    },
  },
  components: {
    Icon: {
      baseStyle: ({ colorMode: cm }: any) => ({
        fill: cm === "dark" ? "gray.50" : "gray.800",
      }),
    },
    Text: {
      baseStyle: ({ colorMode: cm, variant }: any) => {
        const secondary = { light: "gray.600", dark: "gray.300" };
        const primary = { light: "gray.800", dark: "gray.50" };
        const colors: { [key: string]: { [key: string]: string } } = {
          secondary,
          primary,
        };
        if (variant === "secondary") {
          console.log("\nTHEME TEXT COLOR:", colors[variant][cm]);
          console.log({ colors, variant, cm }, "\n\n");
        }
        return {
          color: colors[variant][cm],
        };
      },
      defaultProps: {
        variant: "primary",
      },
      // baseStyle: ({ colorMode: cm }: any) => ({
      //   color: cm === "dark" ? "gray.50" : "gray.800",
      // }),
    },
    Button: {
      variants: {
        "solid-blue": ({ colorMode: cm }: any) => ({
          bg: cm === "dark" ? "blue.700" : "blue.400",
          color: cm === "dark" ? "#fff" : "#fff",

          _hover: {
            bg: cm === "dark" ? "blue.600" : "blue.500",
          },
          _active: {
            bg: cm === "dark" ? "blue.500" : "blue.600",
          },
          _disabled: {
            _hover: { bg: cm === "dark" ? "blue.600" : "blue.500" },
          },
        }),
        "solid-red": ({ colorMode: cm }: any) => ({
          bg: cm === "dark" ? "red.700" : "red.400",
          color: cm === "dark" ? "#fff" : "#fff",

          _hover: {
            bg: cm === "dark" ? "red.600" : "red.500",
          },
          _active: {
            bg: cm === "dark" ? "red.500" : "red.600",
          },
          _disabled: {
            pointerEvents: "none",
          },
        }),
        "solid-neutral": ({ colorMode: cm }: any) => ({
          bg: cm === "dark" ? "gray.700" : "gray.200",
          color: cm === "dark" ? "gray.50" : "gray.700",

          _hover: {
            bg: cm === "dark" ? "gray.600" : "gray.300",
          },
          _active: {
            bg: cm === "dark" ? "gray.500" : "gray.400",
          },
          _disabled: {
            pointerEvents: "none",
          },
        }),
        "icon-button": ({ colorMode: cm }: any) => ({
          transition: "background 0.2s",
          bg: "transparent",
          _hover: {
            bg: cm === "dark" ? "gray.700" : "gray.100",
          },
          _active: {
            bg: cm === "dark" ? "gray.600" : "gray.200",
          },
        }),
        "icon-button-red": ({ colorMode: cm }: any) => ({
          transition: "background 0.2s",
          bg: "transparent",
          _hover: {
            bg: cm === "dark" ? "red.400" : "red.50",
          },
          _active: {
            bg: cm === "dark" ? "red.500" : "red.100",
          },
        }),
      },
      baseStyle: {
        _disabled: { _hover: { bg: "unset" } },
      },
    },
    Input: inputHelpers.defineMultiStyleConfig({
      variants: {
        "neutral-outline": ({ colorMode: cm, isInvalid }) => {
          // console.log("INPUT PROPS:", { isInvalid });
          const red = cm === "dark" ? "red.300" : "red.500";
          const gray = cm === "dark" ? "gray.500" : "gray.300";
          const focusGray = cm === "dark" ? "gray.300" : "gray.500";

          return {
            field: {
              bg: "transparent",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: isInvalid ? red : gray,
              color: cm === "dark" ? "gray.50" : "gray.800",

              _hover: {
                borderColor: undefined,
              },
              _focus: {
                borderColor: isInvalid ? red : focusGray,
              },
              _focusVisible: { outline: "none" },
              _placeholder: {
                color: cm === "dark" ? "gray.300" : "gray.500",
              },
            },
            element: {},
            addon: {},
          };
        },
      },
    }),
    // Input: inputHelpers.defineMultiStyleConfig({
    //   variants: {
    //     "neutral-outline": ({ colorMode: cm }) => ({
    //       field: {
    //         bg: "transparent",
    //         borderWidth: "1px",
    //         borderStyle: "solid",
    //         borderColor: cm === "dark" ? "gray.500" : "gray.300",
    //         color: cm === "dark" ? "gray.50" : "gray.800",

    //         _hover: {
    //           borderColor: undefined,
    //           // borderColor: cm === "dark" ? "gray.400" : "gray.400",
    //         },
    //         _focus: {
    //           borderColor: cm === "dark" ? "gray.300" : "gray.500",
    //         },
    //         _focusVisible: { outline: "none" },
    //         _placeholder: {
    //           color: cm === "dark" ? "gray.300" : "gray.500",
    //         },
    //       },
    //       element: {},
    //       addon: {},
    //     }),
    //   },
    // }),
  },
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
  },
});

export default theme;
