import {
  Box,
  Flex,
  Button,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import { HamburgerIcon } from "utils/icons";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const bg = isDark ? "gray.800" : "gray.50";
  return (
    <Box h="60px" position="fixed" top={0} left={0} right={0} bg={bg}>
      <Flex h="100%" w="100%" align="center" px={{ base: "1.5rem" }}>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Menu Button"
          icon={<HamburgerIcon boxSize="22px" />}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
