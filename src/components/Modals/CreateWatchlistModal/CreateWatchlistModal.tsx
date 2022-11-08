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
  FormErrorMessage,
  Box,
  CloseButton,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { type IAsset } from "utils/types/asset";
import { alpaca } from "api";
// import alpacaApi from "api/alpaca";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateWatchlistModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allAssets, setAllAssets] = useState<any[]>();
  const [addedSymbols, setAddedSymbols] = useState<string[]>([]);
  const [addSymbolValue, setAddSymbolValue] = useState("");
  const [addSymbolError, setAddSymbolError] = useState("");

  const bg = useColorModeValue("gray.50", "gray.900");
  const helperTextColor = useColorModeValue("gray.700", "gray.200");
  const errorMsgColor = useColorModeValue("red.600", "red.300");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await alpaca.get("/assets", {
          params: {
            status: "active",
            // docs say us_equity is default, but as of 11/08/22, crypto
            //  is still being returned if us_equity is not specified
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

      setFetching(false);
    };

    fetchAssets();
  }, []);

  const handleAddTicker = (symbol: string) => {
    setAddedSymbols((prev) => [...prev, symbol]);
    // handleKeyDown performs null check.  '!' is fine here.
    setAddSymbolValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!addSymbolValue) return;

    const length = addSymbolValue.length;

    if (e.key === "Enter" && length) {
      if (length > 5) {
        return setAddSymbolError(
          "Symbols shouldn't be longer than 5 characters"
        );
      }

      if (addSymbolValue.length && isValid(addSymbolValue)) {
        handleAddTicker(addSymbolValue);
      }
    }
  };

  const isValid = (symbol: string) => {
    const isIncluded = allAssets?.includes(symbol.toUpperCase());
    console.log(`${symbol} is included? ${isIncluded}`);
    if (isIncluded) {
      return true;
    } else {
      setAddSymbolError(
        `Could not find an equity with the symbol ${symbol.toUpperCase()}`
      );
    }
    return isIncluded;
  };

  type Body = {
    name: string;
    symbols?: string[];
  };

  const createWatchlist = async () => {
    if (!name) return;

    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const body: Body = { name };
      if (addedSymbols && addedSymbols.length) {
        body["symbols"] = addedSymbols;
      }

      const response = await alpaca.post("/watchlists", body, { headers });
      console.log("CREATE RESPONSE.DATA:", response.data);
    } catch (e) {
      console.log("FAILED TO CREATE WATCHLIST:", e);
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} allowPinchZoom>
      <ModalOverlay />

      <ModalContent bg={bg}>
        <ModalHeader>Create a New Watchlist</ModalHeader>

        <ModalBody>
          <Stack spacing="1rem">
            <FormControl isRequired>
              <FormLabel>Watchlist Name</FormLabel>
              <Input
                variant="neutral-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Box>
              <FormControl isInvalid={!!addSymbolError}>
                <FormLabel>Tickers</FormLabel>
                <Input
                  isDisabled={fetching}
                  variant="neutral-outline"
                  value={addSymbolValue}
                  onChange={(e) => {
                    setAddSymbolValue(e.target.value);
                    if (addSymbolError) setAddSymbolError("");
                  }}
                  onKeyDown={handleKeyDown}
                />
                {!addSymbolError ? (
                  <FormHelperText
                    mt="4px"
                    fontSize="13px"
                    color={helperTextColor}
                  >
                    Type a symbol and press enter to add it to your watchlist
                  </FormHelperText>
                ) : (
                  <FormErrorMessage color={errorMsgColor}>
                    {addSymbolError}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Wrap direction="row" mt="1rem">
                {addedSymbols && addedSymbols.length
                  ? addedSymbols.map((symbol, i) => {
                      return (
                        <WrapItem>
                          <SymbolChip symbol={symbol} key={i} />
                        </WrapItem>
                      );
                    })
                  : null}
              </Wrap>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            onClick={createWatchlist}
            isLoading={loading}
            variant="solid-blue"
            ml="1rem"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateWatchlistModal;

const SymbolChip = ({ symbol }: { symbol: string }) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex
      bg={bg}
      pl="4px"
      borderRadius="3px"
      align="center"
      sx={{
        "& svg": {
          boxSize: "9px",
        },
      }}
    >
      <Box
        lineHeight={1}
        textTransform="uppercase"
        fontWeight="600"
        letterSpacing=".5px"
        fontSize="13px"
      >
        {symbol}
      </Box>

      <CloseButton size="sm" ml="4px" />
    </Flex>
  );
};
