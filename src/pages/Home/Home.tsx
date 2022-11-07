import {
  Box,
  useBreakpointValue,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";

// import Authenticate from "components/Authenticate";
import Drawer from "components/Drawer";
import useSelector from "hooks/useSelector";

const Home = () => {
  const { authenticated } = useSelector((st) => st.user);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const {
    colors: { gray },
  } = useTheme();

  const defaultTransition = useBreakpointValue({
    base: { x: "-100%", opacity: 0 },
    md: { y: "100vh", opacity: 0 },
  });

  return (
    <Box
      h="100%"
      // position="relative"
      sx={{
        ".my-drawer": {
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          borderRight: useBreakpointValue({
            base: "none",
            md: "1px solid",
          }),
          borderTop: useBreakpointValue({
            base: "1px solid",
            md: "none",
          }),
          backgroundColor: isDark ? "gray.800" : "gray.50",
          borderColor: isDark ? gray["700"] : gray["100"],
          padding: useBreakpointValue({
            base: ".5rem",
            md: "1rem .5rem",
          }),
          left: useBreakpointValue({ base: "unset", md: "-100%" }),
          bottom: useBreakpointValue({ base: "-100%", md: "unset" }),
        },
      }}
    >
      {authenticated.local ? (
        <Box position="relative">
          <Drawer />
        </Box>
      ) : null}
    </Box>
  );
};

export default Home;
