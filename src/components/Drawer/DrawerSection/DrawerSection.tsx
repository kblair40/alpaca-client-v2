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
  MenuDivider,
} from "@chakra-ui/react";

import { MoreHorizontalIcon } from "utils/icons";

type Props = {
  label: string;
  children?: React.ReactNode;
};

const DrawerSection = ({ children, label }: Props) => {
  return (
    <Box>
      <Flex
        justify={{ md: "space-between" }}
        align={{ md: "center" }}
        // border="1px solid #aaa"
      >
        <Text fontWeight={600} textTransform="uppercase">
          {label}
        </Text>

        <Menu>
          <MenuButton
            as={IconButton}
            variant="icon-button"
            size="sm"
            rounded="full"
            icon={<MoreHorizontalIcon />}
          />

          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box>{children}</Box>
    </Box>
  );
};

export default DrawerSection;
