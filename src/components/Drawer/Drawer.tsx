import React from "react";
import { useColorMode, Stack, useBreakpointValue } from "@chakra-ui/react";

import DrawerSection from "./DrawerSection";
import DrawerWrapper from "./DrawerWrapper";
import TickerPerformance from "components/TickerPerformance";
import Watchlists from "components/Watchlists";
import { Scrollbars } from "react-custom-scrollbars-2";

type Props = {
  position: "left" | "bottom";
};

const Drawer = ({ position }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const isMd = useBreakpointValue({ base: false, md: true })!;

  // 218px

  return (
    <React.Fragment>
      <DrawerWrapper isOpen={true} position={position}>
        <Scrollbars
          style={{ overflowX: "hidden" }}
          thumbSize={20}
          thumbMinSize={20}
          hideTracksWhenNotNeeded={true}
          autoHide={true}
          autoHideTimeout={500}
          autoHideDuration={100}
          universal={true}
        >
          <Stack
            w="100%"
            maxW="100%"
            overflowX={{ base: "auto", md: "hidden" }}
            overflowY={{ base: "hidden", md: "auto" }}
            direction={{ base: "row", md: "column" }}
            spacing={{ base: ".5rem", md: "1.5rem" }}
            h="100%"
            // border="1px solid red"
            px={{ md: "8px" }}
            pb={{ md: "8px" }}
          >
            <DrawerSection
              label="watchlists"
              width={{ base: "100%", md: "100%" }}
              padding={{ base: "4px 8px", md: "none" }}
            >
              <Watchlists />
            </DrawerSection>

            <DrawerSection
              label="index etfs"
              width={{ base: "max-content", md: "100%" }}
              padding={{ base: "4px 8px", md: "none" }}
            >
              <Stack>
                <TickerPerformance />
                <TickerPerformance />
                <TickerPerformance />
              </Stack>
            </DrawerSection>
          </Stack>
        </Scrollbars>
      </DrawerWrapper>
    </React.Fragment>
  );
};

export default Drawer;
