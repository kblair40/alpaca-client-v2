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
import TickerDetail from "components/TickerDetail";
import Clock from "components/Clock";
import useSelector from "hooks/useSelector";

const Home = () => {
  const { authenticated } = useSelector((st) => st.user);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const {
    colors: { gray },
  } = useTheme();

  const isMd = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      w="100%"
      maxW="100vw"
      overflowX="hidden"
      // new
      overflowY={{ md: "hidden" }}
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
          // left: useBreakpointValue({ base: "0", md: "-100%" }),
          // bottom: useBreakpointValue({ base: "-100%", md: "unset" }),
          // bottom: useBreakpointValue({ base: "0", md: "unset" }),
          // new
          // maxHeight: "calc(100vh - 60px)",
          maxHeight: useBreakpointValue({
            base: "180px",
            md: "calc(100vh - 60px)",
          }),
          height: "100%",
          // overflowY: "hidden",
          overflowX: "hidden",
          // new
          border: "1px solid orange",
          position: useBreakpointValue({ base: "fixed", md: "unset" }),
        },
      }}
    >
      {authenticated.local ? (
        <Flex
          //
          border="1px solid white"
        >
          {isMd && (
            <Box
              // display={{ base: "none", md: "block" }}
              maxWidth="260px"
              w="100%"
              overflowX="hidden"
              py="4px"
              // border="1px solid green"
            >
              <Drawer position="left" />
            </Box>
          )}

          <Box
            // border="1px solid red"
            w="100%"
            maxW={{ base: "100vw", md: "calc(100vw - 220px)" }}
          >
            <Box p={{ base: "0 1rem", md: "1rem" }}>
              <Chart />

              <TickerDetail />
            </Box>

            {!isMd && (
              <Box
                border="1px solid green"
                w="100%"
                // display={{ base: "block", md: "none" }}
                // position="fixed"
                // bottom={0}
                h="180px"
              >
                {/* <Box h="180px" border="1px solid white" /> */}
                <Drawer position="bottom" />
              </Box>
            )}
          </Box>

          <Clock />
        </Flex>
      ) : null}
    </Box>
  );
};

export default Home;
