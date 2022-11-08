import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { MoreHorizontalIcon, TrashIcon, EditIcon } from "utils/icons";

type Props = {
  id: string;
  onClickOption?: () => void;
};

const WatchlistMenu = ({ id }: Props) => {
  const menuBg = useColorModeValue("gray.50", "gray.800");
  const iconBoxSize = "16px";
  const deleteColor = useColorModeValue("red.600", "red.300");

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="icon-button"
        size="xs"
        icon={<MoreHorizontalIcon boxSize="16px" />}
      />

      <MenuList
        fontSize="sm"
        bg={menuBg}
        py={0}
        //
      >
        <MenuItem py={2} icon={<EditIcon boxSize={iconBoxSize} />}>
          Edit Stocks
        </MenuItem>
        <MenuItem
          color={deleteColor}
          py={2}
          icon={<TrashIcon boxSize={iconBoxSize} fill={deleteColor} />}
        >
          Delete Watchlist
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default WatchlistMenu;
