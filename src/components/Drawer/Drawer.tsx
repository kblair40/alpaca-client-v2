import React, { useState } from "react";
import { Button, useColorMode, Box } from "@chakra-ui/react";

import DrawerWrapper from "./DrawerWrapper";
import "./Drawer.css";

const Drawer = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <DrawerWrapper isOpen={isOpen}>
        <Box>Nisi deserunt anim veniam ut nostrud ullamco sunt in.</Box>
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
