import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const Drawer = () => {
  return (
    <ChakraDrawer isOpen={false} onClose={() => console.log("closing")}>
      Drawer
    </ChakraDrawer>
  );
};

export default Drawer;
