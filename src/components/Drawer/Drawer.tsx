import React, { useState } from "react";
import {
  Button,
  useColorMode,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

import DrawerSection from "./DrawerSection";
import DrawerWrapper from "./DrawerWrapper";
import TickerPerformance from "components/TickerPerformance";
// import Watchlists from "components/Watchlists";
import Watchlists from "components/Watchlists";
import { Scrollbars } from "react-custom-scrollbars-2";

type Props = {
  position: "left" | "bottom";
};

const Drawer = ({ position }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const isMd = useBreakpointValue({ base: false, md: true })!;

  return (
    <React.Fragment>
      {/* <DrawerWrapper isOpen={isOpen}> */}
      {/* <DrawerWrapper isOpen={isMd} position={position}> */}
      <DrawerWrapper isOpen={true} position={position}>
        <Scrollbars
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
            // overflowX="hidden"
            overflowX={{ base: "auto", md: "hidden" }}
            // overflowY="auto"
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
              // width={{ base: "60%", md: "100%" }}
              width={{ base: "100%", md: "100%" }}
              padding={{ base: "4px 8px", md: "none" }}
            >
              <Watchlists />
            </DrawerSection>

            <DrawerSection
              label="index etfs"
              // width={{ base: "40%", md: "100%" }}
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

      <OpenCloseButton
        isOpen={isOpen}
        toggle={() => setIsOpen((prev) => !prev)}
      />
    </React.Fragment>
  );
};

export default Drawer;

type BtnProps = {
  isOpen: boolean;
  toggle: () => void;
};

const OpenCloseButton = ({ isOpen, toggle }: BtnProps) => {
  return (
    <Button
      onClick={toggle}
      size="xs"
      position="fixed"
      bottom="1rem"
      right="1rem"
    >
      {isOpen ? "Close" : "Open"}
    </Button>
  );
};
