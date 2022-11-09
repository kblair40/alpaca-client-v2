import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";

import useFetchAssets from "hooks/useFetchAssets";
import useDispatch from "hooks/useDispatch";
import { watchlistActions } from "store/watchlistSlice";
import { alpaca } from "api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateWatchlistModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [addedSymbols, setAddedSymbols] = useState<string[]>([]);
  const [addSymbolValue, setAddSymbolValue] = useState("");
  const [createError, setCreateError] = useState("");

  const dispatch = useDispatch();

  const bg = useColorModeValue("gray.50", "gray.900");
  const helperTextColor = useColorModeValue("gray.700", "gray.200");
  const errorColor = useColorModeValue("red.600", "red.300");

  const {
    loading: fetching,
    error,
    addSymbolError,
    validateAsset,
    setAddSymbolError,
  } = useFetchAssets();

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

      if (addSymbolValue.length && validateAsset(addSymbolValue)) {
        handleAddTicker(addSymbolValue);
      }
    }
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
              <FormControl isInvalid={!!addSymbolError || !!error}>
                <FormLabel>Tickers</FormLabel>
                <Input
                  isDisabled={fetching || Boolean(error)}
                  isInvalid={!!addSymbolError || !!error}
                  variant="neutral-outline"
                  value={addSymbolValue}
                  onChange={(e) => {
                    setAddSymbolValue(e.target.value);
                    if (addSymbolError) setAddSymbolError("");
                  }}
                  onKeyDown={handleKeyDown}
                />

                {error ? (
                  <Text
                    mt="1.5rem"
                    fontSize="15px"
                    textAlign="center"
                    color={errorColor}
                  >
                    {error}
                  </Text>
                ) : !addSymbolError ? (
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
