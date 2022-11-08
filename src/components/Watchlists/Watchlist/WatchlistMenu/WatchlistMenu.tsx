import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import { watchlistActions } from "store/watchlistSlice";
import alpacaApi from "api/alpaca";
import { MoreHorizontalIcon, TrashIcon, EditIcon } from "utils/icons";
import DeleteModal from "./DeleteModal";

type Props = {
  id: string;
  name: string;
  onClickOption?: () => void;
};

const WatchlistMenu = ({ id, name }: Props) => {
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const menuBg = useColorModeValue("gray.50", "gray.800");
  const iconBoxSize = "16px";
  const deleteColor = useColorModeValue("red.600", "red.300");

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const response = await alpacaApi.delete(`/watchlists/${id}`);
      console.log("RESPONSE:", response.data);
    } catch (e) {
      console.log("FAILED TO DELETE WATCHLIST:", e);
    }

    setDeleteModalOpen(false);
    setDeleting(false);

    dispatch(watchlistActions.deleteWatchlist(id));
  };

  return (
    <Fragment>
      <Menu>
        <MenuButton
          as={IconButton}
          variant="icon-button"
          size="xs"
          icon={<MoreHorizontalIcon boxSize="16px" />}
        />

        <MenuList fontSize="sm" bg={menuBg} py={0}>
          <MenuItem py={2} icon={<EditIcon boxSize={iconBoxSize} />}>
            Edit Stocks
          </MenuItem>
          <MenuItem
            color={deleteColor}
            py={2}
            icon={<TrashIcon boxSize={iconBoxSize} fill={deleteColor} />}
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete Watchlist
          </MenuItem>
        </MenuList>
      </Menu>

      <DeleteModal
        name={name}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        deleting={deleting}
      />
    </Fragment>
  );
};

export default WatchlistMenu;
