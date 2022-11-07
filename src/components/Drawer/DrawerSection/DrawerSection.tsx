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

import { MoreVerticalIcon } from "utils/icons";

type Props = {
  label: string;
  children?: JSX.Element;
};

const DrawerSection = ({ children, label }: Props) => {
  return (
    <Box>
      <Flex justify={{ md: "space-between" }}>
        <Text fontWeight={600} textTransform="uppercase">
          {label}
        </Text>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<MoreVerticalIcon boxSize="20px" />}
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
