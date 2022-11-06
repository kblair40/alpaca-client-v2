import { useState } from "react";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "utils/icons";

const AvatarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chevronFill = useColorModeValue("gray.500", "gray.400");

  const svgClass = isOpen ? "menu_open" : "menu_closed";

  return (
    <Menu onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
      <MenuButton h="36px">
        <Flex
          align="center"
          sx={{
            "& .icon_wrapper": {
              transition: "transform 0.2s ease",
              transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
            },
          }}
        >
          <Avatar size="sm" mr=".5rem" boxSize="36px" />
          <Box className="icon_wrapper">
            <ChevronDownIcon boxSize="1rem" fill={chevronFill} />
          </Box>
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
