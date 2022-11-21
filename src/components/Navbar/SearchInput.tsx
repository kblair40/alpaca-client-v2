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
  PopoverFooter,
  PopoverArrow,
  // PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Box,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";

import api from "api";
import { SearchIcon } from "utils/icons";

interface SearchProps {
  isDark: boolean;
  isDisabled: boolean;
}

const SearchInput = ({ isDark, isDisabled }: SearchProps) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
      setShowResults(false);
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
            <PopoverBody>
              {results && results.length ? (
                results.map((res, i) => {
                  return <Box key={i}>{res.symbol}</Box>;
                })
              ) : results && !results.length ? (
                <Text textAlign="center">No Results</Text>
              ) : searching ? (
                <Center>
                  <Spinner />
                </Center>
              ) : null}
            </PopoverBody>
            {/* <Results results={results} /> */}
          </PopoverContent>
        </Portal>
      </Popover>
    </Tooltip>
  );
};

export default SearchInput;

const Results = ({ results }: { results: null | any[] }) => {
  return (
    <PopoverBody>
      Body Body Body Body Body Body Body Body Body Body Body Body Body Body
    </PopoverBody>
  );
};
