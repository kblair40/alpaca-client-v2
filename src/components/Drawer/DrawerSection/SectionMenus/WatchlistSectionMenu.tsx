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
import { MoreHorizontalIcon } from "utils/icons";

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

        <MenuList bg={menuBg}>
          <MenuItem onClick={() => setCreateModalOpen(true)}>
            Create New Watchlist
          </MenuItem>
          {/* fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa */}
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
