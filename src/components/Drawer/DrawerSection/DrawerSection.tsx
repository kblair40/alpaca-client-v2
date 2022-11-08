import React from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

import { MoreHorizontalIcon } from "utils/icons";

type Props = {
  label: string;
  children?: React.ReactNode;
};

const DrawerSection = ({ children, label }: Props) => {
  const menuBg = useColorModeValue("gray.50", "gray.900");
  return (
    <Box>
      <Flex justify={{ md: "space-between" }} align={{ md: "center" }}>
        <Text fontWeight={700} textTransform="uppercase" fontSize="15px">
          {label}
        </Text>

        <Menu>
          <MenuButton
            as={IconButton}
            variant="icon-button"
            size="xs"
            rounded="full"
            icon={<MoreHorizontalIcon boxSize="18px" />}
          />

          <MenuList bg={menuBg}>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box pt="8px">{children}</Box>
    </Box>
  );
};

export default DrawerSection;
