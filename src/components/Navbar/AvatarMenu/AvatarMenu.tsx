import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "utils/icons";

const AvatarMenu = () => {
  const chevronFill = useColorModeValue("gray.500", "gray.400");
  return (
    <Menu>
      <MenuButton h="36px">
        <Flex align="center">
          <Avatar size="sm" mr=".5rem" boxSize="36px" />
          <ChevronDownIcon boxSize="1rem" fill={chevronFill} />
        </Flex>
      </MenuButton>

      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Account</MenuItem>
        <MenuDivider />
        <MenuItem>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
