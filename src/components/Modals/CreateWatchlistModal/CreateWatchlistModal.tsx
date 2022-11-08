import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  FormHelperText,
  Box,
} from "@chakra-ui/react";

import { type IAsset } from "utils/types/asset";
import alpacaApi from "api/alpaca";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateWatchlistModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [allAssets, setAllAssets] = useState<any[]>();
  const [addedSymbols, setAddedSymbols] = useState<string[]>();

  const bg = useColorModeValue("gray.50", "gray.900");
  const helperTextColor = useColorModeValue("gray.700", "gray.200");

  const symbolInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // 31,542 -> 11,108
        const response = await alpacaApi.get("/assets", {
          params: {
            status: "active",
          },
        });
        console.log("ASSETS RESPONSE.DATA:", response.data);
        const tradableAssets = response.data.filter((asset: IAsset) => {
          console.log("ASSET:", asset);
          return asset.tradable;
        });
        console.log("COUNT:", tradableAssets.length);
        setAllAssets(tradableAssets);
      } catch (e) {
        console.log("FAILED TO FETCH ASSETS:", e);
      }
    };

    fetchAssets();
  }, []);

  const handleAddTicker = () => {
    //
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!symbolInputRef.current) return;

    const { value } = symbolInputRef.current;
    if (e.key === "Enter" && value.length) {
    }
  };

  // const isValid =

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent bg={bg}>
        <ModalHeader>Create a New Watchlist</ModalHeader>

        <ModalBody>
          <Stack spacing="1rem">
            <FormControl isRequired>
              <FormLabel>Watchlist Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <Box>
              <FormControl isRequired>
                <FormLabel>Tickers</FormLabel>
                <Input ref={symbolInputRef} />
                <FormHelperText
                  mt="4px"
                  fontSize="13px"
                  color={helperTextColor}
                >
                  Type a symbol and press enter to add it to your watchlist
                </FormHelperText>
              </FormControl>

              <Stack direction="row" wrap="wrap"></Stack>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>

          <Button isLoading={loading} variant="solid-blue" ml="1rem">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateWatchlistModal;
