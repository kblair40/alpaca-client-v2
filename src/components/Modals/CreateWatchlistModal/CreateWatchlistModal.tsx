import React, { useState, useEffect } from "react";
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

import useDispatch from "hooks/useDispatch";
import { watchlistActions } from "store/watchlistSlice";
import { type IAsset } from "utils/types/asset";
import { alpaca } from "api";
import alpacaApi from "api/alpaca";

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
  const [createError, setCreateError] = useState("");

  const dispatch = useDispatch();

  const bg = useColorModeValue("gray.50", "gray.900");
  const helperTextColor = useColorModeValue("gray.700", "gray.200");
  const errorColor = useColorModeValue("red.600", "red.300");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await alpacaApi.get("/assets", {
          params: {
            status: "active",
            // docs say us_equity is default, but as of 11/08/22, crypto
            //  is still being returned if us_equity is not specified
            asset_class: "us_equity",
          },
        });
        // console.log("ASSETS RESPONSE.DATA:", response.data);

        if (response.data) {
          let tradableAssets: string[] = [];

          response.data.forEach((asset: IAsset) => {
            if (asset.tradable) {
              tradableAssets.push(asset.symbol);
            }
          });

          // console.log("COUNT:", tradableAssets.length);
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
    setAddedSymbols((prev) => [...prev, symbol.toUpperCase()]);
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
      const body: Body = { name };
      if (addedSymbols && addedSymbols.length) {
        body["symbols"] = addedSymbols;
      }

      const response = await alpaca.post("/watchlists", body);
      // console.log("CREATE RESPONSE.DATA:", response.data);
      dispatch(watchlistActions.addWatchlist(response.data));
      onClose();
    } catch (e: any) {
      console.log("FAILED TO CREATE WATCHLIST:", e);
      let error = e.response.data.message;
      error = error[0].toUpperCase() + error.slice(1);
      setCreateError(error);
    }

    setLoading(false);
  };

  const removeSymbol = (symbol: string) => {
    let symbolsCopy = [...addedSymbols];
    let symbolIdx = symbolsCopy.findIndex((sym) => sym === symbol);
    if (symbolIdx !== -1) {
      symbolsCopy.splice(symbolIdx, 1);
    }

    setAddedSymbols(symbolsCopy);
  };

  const nameInvalid =
    !!createError && createError.split(" ").includes("unique");
  // console.log("IS INVALID:", nameInvalid);

  const errorMsgProps = {
    color: errorColor,
    fontSize: "13px",
    mt: "4px",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent bg={bg}>
        <ModalHeader>Create a New Watchlist</ModalHeader>

        <ModalBody>
          <Stack spacing="1rem">
            <FormControl isRequired isInvalid={nameInvalid}>
              <FormLabel>Watchlist Name</FormLabel>
              <Input
                variant="neutral-outline"
                value={name}
                isInvalid={nameInvalid}
                onChange={(e) => {
                  setName(e.target.value);
                  if (createError) setCreateError("");
                }}
              />
              <FormErrorMessage {...errorMsgProps}>
                {createError}
              </FormErrorMessage>
            </FormControl>

            <Box>
              <FormControl isInvalid={!!addSymbolError}>
                <FormLabel>Tickers</FormLabel>
                <Input
                  isDisabled={fetching}
                  isInvalid={!!addSymbolError}
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
                  <FormErrorMessage {...errorMsgProps}>
                    {addSymbolError}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Wrap direction="row" mt="1rem">
                {addedSymbols && addedSymbols.length
                  ? addedSymbols.map((symbol, i) => {
                      return (
                        <WrapItem key={i}>
                          <SymbolChip
                            symbol={symbol}
                            onClickRemove={removeSymbol}
                          />
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

type ChipProps = {
  symbol: string;
  onClickRemove: (symbol: string) => void;
};

const SymbolChip = ({ symbol, onClickRemove }: ChipProps) => {
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

      <CloseButton onClick={() => onClickRemove(symbol)} size="sm" ml="4px" />
    </Flex>
  );
};
