import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PositionDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton onClick={onClose} />
        <DrawerHeader>Ticker Symbol Here</DrawerHeader>

        <DrawerBody>
          body stuff body stuff body stuff body stuff body stuff body stuff
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default PositionDrawer;
