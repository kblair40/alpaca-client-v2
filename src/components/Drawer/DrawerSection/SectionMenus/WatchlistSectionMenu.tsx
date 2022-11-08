import { useState, Fragment } from "react";
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

import CreateWatchlistModal from "components/Modals/CreateWatchlistModal";
import { MoreHorizontalIcon, PlusIcon } from "utils/icons";

type Props = {};

const WatchlistSectionMenu = (props: Props) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

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

        <MenuList bg={menuBg} fontSize="sm" py={0}>
          <MenuItem
            py=".5rem"
            fontWeight="500"
            icon={<PlusIcon boxSize="18px" />}
            onClick={() => setCreateModalOpen(true)}
          >
            Create New Watchlist
          </MenuItem>
        </MenuList>
      </Menu>

      <CreateWatchlistModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </Fragment>
  );
};

export default WatchlistSectionMenu;
