import { Input, InputGroup, InputLeftElement, Tooltip } from "@chakra-ui/react";

import { SearchIcon } from "utils/icons";

interface SearchProps {
  isDark: boolean;
  isDisabled: boolean;
}

const SearchInput = ({ isDark, isDisabled }: SearchProps) => {
  const placeholderColor = isDark ? "gray.300" : "gray.500";
  return (
    <Tooltip label="You must be signed in" isDisabled={!isDisabled}>
      <InputGroup maxW="260px">
        <InputLeftElement
          h="36px"
          children={<SearchIcon boxSize="16px" />}
          pointerEvents="none"
        />
        <Input
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
