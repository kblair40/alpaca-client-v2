import {
  Box,
  Flex,
  Button,
  IconButton,
  useColorMode,
  useBreakpointValue,
  Tooltip,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import {
  HamburgerIcon,
  DashboardIcon,
  FolderIcon,
  SearchIcon,
  AlpacaLogoIcon,
} from "utils/icons";
import AvatarMenu from "./AvatarMenu";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { authenticated } = useSelector((st) => st.user);

  const bg = isDark ? "gray.800" : "gray.50";
  return (
    <Box h="60px" position="fixed" top={0} left={0} right={0} bg={bg}>
      <Flex
        h="100%"
        w="100%"
        align="center"
        px={{ base: "1.5rem" }}
        justify="space-between"
      >
        <IconButton
          display={{ md: "none" }}
          variant="ghost"
          size="sm"
          aria-label="Menu Button"
          icon={<HamburgerIcon boxSize="24px" />}
        />

        <HStack ml={{ base: "2rem", md: 0 }} spacing="1rem">
          <AlpacaLogoIcon boxSize="24px" />
          <CollapseButton label="Portfolio" />
          <CollapseButton label="Dashboard" />
        </HStack>

        <Flex ml="2rem" flex={1} justify="center">
          <SearchInput isDark={isDark} />
        </Flex>

        <Box ml="2rem">
          {authenticated && authenticated.local ? (
            <AvatarMenu />
          ) : (
            <AuthButtons />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;

interface CollapseButtonProps {
  label: "Dashboard" | "Portfolio";
}

const CollapseButton = ({ label }: CollapseButtonProps) => {
  const large = () => (
    <Button size="sm" leftIcon={icons[label]}>
      {label}
    </Button>
  );

  const small = () => (
    <Tooltip label={label}>
      <IconButton
        size="sm"
        icon={icons[label]}
        aria-label={`${label} button`}
      />
    </Tooltip>
  );

  const button = useBreakpointValue({ base: small(), md: large() })!;

  return button;
};

const icons = {
  Dashboard: <DashboardIcon boxSize="20px" />,
  Portfolio: <FolderIcon boxSize="20px" />,
};

const SearchInput = ({ isDark }: { isDark: boolean }) => {
  const placeholderColor = isDark ? "gray.300" : "gray.500";
  return (
    <InputGroup maxW="400px">
      <InputLeftElement
        h="36px"
        children={<SearchIcon boxSize="16px" />}
        pointerEvents="none"
      />
      <Input
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
  );
};
