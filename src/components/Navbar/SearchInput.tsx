import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement, Tooltip } from "@chakra-ui/react";

import api from "api";
import { SearchIcon } from "utils/icons";

interface SearchProps {
  isDark: boolean;
  isDisabled: boolean;
}

const SearchInput = ({ isDark, isDisabled }: SearchProps) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const placeholderColor = isDark ? "gray.300" : "gray.500";

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setValue(value);

    // if (value.length) {
    //   try {
    //     const response = await api.get(`/search/asset/${value}`);
    //     console.log("\n\nSEARCH RESULTS:", response.data, "\n\n");
    //     if (response && response.data) {
    //       setResults(response.data);
    //     }
    //   } catch (e) {
    //     console.log("FAILED TO FETCH RESULTS:", e);
    //   }
    // }
  };

  return (
    <Tooltip label="You must be signed in" isDisabled={!isDisabled}>
      <InputGroup maxW="260px">
        <InputLeftElement
          h="36px"
          children={<SearchIcon boxSize="16px" />}
          pointerEvents="none"
        />
        <Input
          value={value}
          onChange={handleChange}
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
    </Tooltip>
  );
};

export default SearchInput;
