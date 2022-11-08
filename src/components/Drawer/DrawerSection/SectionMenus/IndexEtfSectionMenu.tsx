import { Fragment } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

import { MoreHorizontalIcon } from "utils/icons";

const IndexEtfSectionMenu = () => {
  const menuBg = useColorModeValue("gray.50", "gray.900");

  return (
    <Fragment>
      <Menu>
        <MenuButton
          as={IconButton}
          variant="icon-button"
          size="xs"
          rounded="full"
          icon={<MoreHorizontalIcon boxSize="18px" />}
        />

        <MenuList bg={menuBg}>
          <MenuItem>TODO</MenuItem>
          <MenuItem>TODO</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};

export default IndexEtfSectionMenu;
