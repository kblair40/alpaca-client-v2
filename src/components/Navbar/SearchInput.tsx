import React, { useState, useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
  Text,
  Center,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import api from "api";
import { SearchIcon } from "utils/icons";

interface SearchProps {
  isDark: boolean;
  isDisabled: boolean;
}

type SearchResult = {
  alpaca_id: string;
  exchange: string;
  name: string;
  symbol: string;
  _id?: string;
};

const SearchInput = ({ isDark, isDisabled }: SearchProps) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const placeholderColor = isDark ? "gray.300" : "gray.500";

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);

    if (value.length) {
      setSearching(true);
      try {
        const response = await api.get(`/search/asset/${value}`);
        console.log("\n\nSEARCH RESULTS:", response.data, "\n\n");
        if (response && response.data) {
          setResults(response.data);
        } else {
          setResults(null);
        }
      } catch (e) {
        console.log("FAILED TO FETCH RESULTS:", e);
        setResults(null);
      }
    } else {
      setResults(null);
    }
    setSearching(false);
  };

  const popoverBg = isDark ? "gray.800" : "gray.50";

  return (
    <Tooltip label="You must be signed in" isDisabled={!isDisabled}>
      <Popover
        initialFocusRef={inputRef}
        isOpen={isFocused && value.length > 0}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <InputGroup maxW="260px">
            <InputLeftElement
              h="36px"
              children={<SearchIcon boxSize="16px" />}
              pointerEvents="none"
            />

            <Input
              ref={inputRef}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              isDisabled={isDisabled}
              h="36px"
              borderRadius="6px"
              _placeholder={{
                color: placeholderColor,
                fontSize: "sm",
                position: "relative",
                bottom: "1px",
              }}
              placeholder="Search for stocks or indexes"
            />
          </InputGroup>
        </PopoverTrigger>

        <Portal>
          <PopoverContent bg={popoverBg}>
            <PopoverHeader>Results</PopoverHeader>
            <PopoverBody p={0}>
              {results && results.length ? (
                results.map((res, i) => {
                  return <Result key={i} result={res} isDark={isDark} />;
                })
              ) : results && !results.length ? (
                <Text textAlign="center">No Results</Text>
              ) : searching ? (
                <Center>
                  <Spinner />
                </Center>
              ) : null}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Tooltip>
  );
};

export default SearchInput;

const Result = ({
  result,
  isDark,
}: {
  result: SearchResult;
  isDark: boolean;
}) => {
  const styles = {
    transition: "background-color 0.2s",
    cursor: "pointer",
    bg: isDark ? "gray.800" : "gray.50",
    _hover: { bg: isDark ? "gray.700" : "gray.100" },
    _active: { bg: isDark ? "gray.600" : "gray.200" },
  };

  return (
    <Flex direction="column" {...styles} px={"0.75rem"} py="2px">
      <Flex align="end">
        <Text fontSize="sm" fontWeight="600">
          {result.symbol}
        </Text>
        <Text fontSize="sm" ml="8px" fontWeight="500" variant="secondary">
          {result.exchange}
        </Text>
      </Flex>

      <Text fontSize="sm" variant="secondary" noOfLines={1}>
        {result.name}
      </Text>
    </Flex>
  );
};
