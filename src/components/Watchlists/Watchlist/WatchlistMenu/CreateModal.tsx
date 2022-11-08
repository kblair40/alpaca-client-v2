import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

type Props = {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  deleting: boolean;
};

const DeleteModal = ({
  isOpen,
  onClose,
  name,
  deleting,
  onConfirmDelete,
}: Props) => {
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalCloseButton />
        <ModalHeader pt="1.75rem" px="2rem">
          {`Are you sure you want to delete ${name || "<unnamed watchlist>"}?`}
        </ModalHeader>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={onConfirmDelete}
            isLoading={deleting}
            variant="solid-blue"
            ml="1rem"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
