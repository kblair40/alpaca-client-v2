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
  const [addedSymbols, setAddedSymbols] = useState<string[]>([]);

  const bg = useColorModeValue("gray.50", "gray.900");
  const helperTextColor = useColorModeValue("gray.700", "gray.200");

  const symbolInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await alpacaApi.get("/assets", {
          params: {
            status: "active",
            // docs say us_equity is default, however as of 11/08/22,
            //  crypto is still being returned if us_equity is not specified
            asset_class: "us_equity",
          },
        });
        console.log("ASSETS RESPONSE.DATA:", response.data);

        if (response.data) {
          let tradableAssets: string[] = [];

          response.data.forEach((asset: IAsset) => {
            if (asset.tradable) {
              tradableAssets.push(asset.symbol);
            }
          });

          console.log("COUNT:", tradableAssets.length);
          setAllAssets(tradableAssets);
        }
      } catch (e) {
        console.log("FAILED TO FETCH ASSETS:", e);
      }
    };

    fetchAssets();
  }, []);

  const handleAddTicker = (symbol: string) => {
    setAddedSymbols((prev: string[]) => [...prev, symbol]);
    // handleKeyDown performs null check.  '!' is fine here.
    symbolInputRef.current!.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!symbolInputRef.current) return;

    if (e.key === "Enter") {
      const { value } = symbolInputRef.current;

      if (value.length && isValid(value)) {
        handleAddTicker(value);
      }
    }
  };

  const isValid = (symbol: string) => {
    const isIncluded = allAssets?.includes(symbol.toUpperCase());
    console.log(`${symbol} is included? ${isIncluded}`);
    return isIncluded;
  };

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
                <Input ref={symbolInputRef} onKeyDown={handleKeyDown} />
                <FormHelperText
                  mt="4px"
                  fontSize="13px"
                  color={helperTextColor}
                >
                  Type a symbol and press enter to add it to your watchlist
                </FormHelperText>
              </FormControl>

              <Stack direction="row" wrap="wrap" mt="1rem">
                {addedSymbols && addedSymbols.length
                  ? addedSymbols.map((symbol, i) => {
                      return <SymbolChip symbol={symbol} key={i} />;
                    })
                  : null}
              </Stack>
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

const SymbolChip = ({ symbol }: { symbol: string }) => {
  const bg = useColorModeValue("gray.200", "gray.600");
  return (
    <Box
      bg={bg}
      p="4px"
      borderRadius="3px"
      lineHeight={1}
      textTransform="uppercase"
      fontWeight="600"
      fontSize="13px"
    >
      {symbol}
    </Box>
  );
};
