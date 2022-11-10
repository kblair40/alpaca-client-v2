import {
  Box,
  useBreakpointValue,
  useTheme,
  useColorMode,
  Flex,
} from "@chakra-ui/react";

// import Authenticate from "components/Authenticate";
import Drawer from "components/Drawer";
import Chart from "components/Chart";
import Clock from "components/Clock";
import useSelector from "hooks/useSelector";

const Home = () => {
  const { authenticated } = useSelector((st) => st.user);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const {
    colors: { gray },
  } = useTheme();

  return (
    <Box
      w="100%"
      maxW="100vw"
      overflowX="hidden"
      // new
      overflowY="hidden"
      maxH="calc(100vh - 60px)"
      // end new
      h="100%"
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
          backgroundColor: isDark ? "gray.900" : "gray.50",
          borderColor: isDark ? gray["700"] : gray["100"],
          // padding: useBreakpointValue({
          //   base: ".5rem .75rem",
          //   md: ".5rem 0 .5rem .75rem",
          // }),
          left: useBreakpointValue({ base: "unset", md: "-100%" }),
          bottom: useBreakpointValue({ base: "-100%", md: "unset" }),
          // new
          maxHeight: "calc(100vh - 60px)",
          // overflowY: "hidden",
          overflowX: "hidden",
        },
      }}
    >
      {authenticated.local ? (
        <Flex
        //
        // border="1px solid white"
        >
          <Box maxWidth="260px" w="100%" overflowX="hidden" py="4px">
            <Drawer />
          </Box>
          <Box
            // border="1px solid green"
            w="100%"
            maxW="calc(100vw - 220px)"
            p="1rem"
          >
            <Chart />
          </Box>

          <Clock />
        </Flex>
      ) : null}
    </Box>
  );
};

export default Home;
