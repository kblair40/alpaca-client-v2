import React, { useState } from "react";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  useColorModeValue,
  Portal,
} from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import { ChevronDownIcon } from "utils/icons";

type Props = {
  onClickLogout: () => void;
};

const AvatarMenu = ({ onClickLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { authenticated, data } = useSelector((st) => st.user);

  const chevronFill = useColorModeValue("gray.500", "gray.400");
  const menuBg = useColorModeValue("gray.50", "gray.800");

  const itemStyles = {
    fontWeight: 500,
  };

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
          <Avatar
            size="sm"
            mr=".5rem"
            boxSize="36px"
            src={
              data && data.avatar_image_url ? data.avatar_image_url : undefined
            }
          />
          <Box className="icon_wrapper">
            <ChevronDownIcon boxSize="1rem" fill={chevronFill} />
          </Box>
        </Flex>
      </MenuButton>

      <Portal>
        <MenuList bg={menuBg}>
          {authenticated.local && (
            <React.Fragment>
              <MenuItem {...itemStyles}>Settings</MenuItem>
              <MenuItem {...itemStyles}>Account</MenuItem>
              <MenuDivider />
            </React.Fragment>
          )}

          <MenuItem
            {...itemStyles}
            onClick={
              authenticated.local
                ? onClickLogout
                : () => console.log("SHOULD NOT BE POSSIBLE")
            }
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default AvatarMenu;
