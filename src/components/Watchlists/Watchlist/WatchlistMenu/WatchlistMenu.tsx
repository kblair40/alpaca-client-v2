import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";

import { MoreHorizontalIcon } from "utils/icons";

type Props = {
  id: string;
  onClickOption?: () => void;
};

const WatchlistMenu = ({ id }: Props) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<MoreHorizontalIcon />} />

      <MenuList>
        <MenuItem>Edit Stocks</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuDivider />
        <MenuItem>Delete Watchlist</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default WatchlistMenu;
