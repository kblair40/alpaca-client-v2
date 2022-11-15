import {
  Box,
  useBreakpointValue,
  useTheme,
  useColorMode,
  Flex,
} from "@chakra-ui/react";

import Drawer from "components/Drawer";
import Chart from "components/Chart";
import TickerDetail from "components/TickerDetail";
import Clock from "components/Clock";
import useSelector from "hooks/useSelector";
import OrderModal from "components/Modals/OrderModal";

const Home = () => {
  const { authenticated } = useSelector((st) => st.user);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const {
    colors: { gray },
  } = useTheme();

  const isMd = useBreakpointValue({ base: false, md: true });
  const borderStyle = useBreakpointValue({ base: "none", md: "1px solid" });

  return (
    <Box
      w="100%"
      maxW="100vw"
      overflowX="hidden"
      overflowY={{ md: "hidden" }}
      maxH="calc(100vh - 60px)"
      h="100%"
      sx={{
        ".my-drawer": {
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          borderRight: borderStyle,
          borderTop: borderStyle,
          backgroundColor: isDark ? "gray.900" : "gray.50",
          borderColor: isDark ? gray["700"] : gray["100"],
          maxHeight: useBreakpointValue({
            base: "170px",
            md: "calc(100vh - 60px)",
          }),
          height: "100%",
          overflowX: "hidden",
          // new
          position: useBreakpointValue({ base: "fixed", md: "unset" }),
        },
      }}
    >
      {authenticated.local ? (
        <Flex>
          {isMd && (
            <Box maxWidth="260px" w="100%" overflowX="hidden" py="4px">
              <Drawer position="left" />
            </Box>
          )}

          <Box w="100%" maxW={{ base: "100vw", md: "calc(100vw - 220px)" }}>
            <Box p={{ base: "1rem 1rem 0", md: "1rem" }}>
              <Chart />

              <TickerDetail />
            </Box>

            {!isMd && (
              <Box w="100%" h="180px">
                <Drawer position="bottom" />
              </Box>
            )}
          </Box>

          <Clock />
        </Flex>
      ) : null}

      <OrderModal />
    </Box>
  );
};

export default Home;
