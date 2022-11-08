import React, { useState } from "react";
import { Button, useColorMode, Stack } from "@chakra-ui/react";

import DrawerSection from "./DrawerSection";
import DrawerWrapper from "./DrawerWrapper";
import TickerPerformance from "components/TickerPerformance";
// import Watchlists from "components/Watchlists";
import Watchlists from "components/Watchlists";

const Drawer = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <DrawerWrapper isOpen={isOpen}>
        <Stack
          direction={{ base: "row", md: "column" }}
          spacing={{ base: ".5rem", md: "1.5rem" }}
        >
          <DrawerSection label="watchlists">{/*  */}</DrawerSection>

          <DrawerSection label="index etf">
            <Stack>
              <TickerPerformance />
              <TickerPerformance />
              <TickerPerformance />
            </Stack>
          </DrawerSection>
        </Stack>
      </DrawerWrapper>

      <OpenCloseButton
        isOpen={isOpen}
        toggle={() => setIsOpen((prev) => !prev)}
      />
      <Watchlists />
      {/* <Watchlists /> */}
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
