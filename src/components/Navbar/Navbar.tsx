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
import useDispatch from "hooks/useDispatch";
import {
  HamburgerIcon,
  DashboardIcon,
  FolderIcon,
  SearchIcon,
} from "utils/icons";
import AvatarMenu from "./AvatarMenu";
import AuthButtons from "./AuthButtons";
import AlpacaButton from "./AlpacaButton";
import { userActions } from "store/userSlice";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { authenticated } = useSelector((st) => st.user);
  const dispatch = useDispatch();

  const isAuthenticated = authenticated.local;

  const handleClickLogout = () => {
    localStorage.removeItem("auth-token");
    dispatch(userActions.logoutLocal());
  };

  const bg = isDark ? "gray.900" : "gray.50";
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
          {isAuthenticated && (
            <Box pr="1rem">
              <AlpacaButton />
            </Box>
          )}
          <CollapseButton
            label="Portfolio"
            isDisabled={!isAuthenticated}
            isDark={isDark}
          />
          <CollapseButton
            label="Dashboard"
            isDisabled={!isAuthenticated}
            isDark={isDark}
          />
        </HStack>

        <Flex ml="2rem" flex={1} justify="center">
          <SearchInput isDark={isDark} isDisabled={!isAuthenticated} />
        </Flex>

        <Box ml="2rem">
          {authenticated && authenticated.local ? (
            <AvatarMenu onClickLogout={handleClickLogout} />
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
  isDisabled: boolean;
  isDark?: boolean;
}

const CollapseButton = ({ label, isDisabled, isDark }: CollapseButtonProps) => {
  const bg = isDark ? "gray.900" : "white";
  const hoverBg = isDark ? "gray.800" : "gray.50";
  const activeBg = isDark ? "gray.700" : "gray.100";

  const btnProps = {
    bg,
    _hover: { bg: hoverBg },
    _active: { bg: activeBg },
    size: "sm",
    isDisabled,
  };

  const large = () => (
    <Tooltip label="You must be signed in" isDisabled={!isDisabled}>
      <Button leftIcon={icons[label]} {...btnProps}>
        {label}
      </Button>
    </Tooltip>
  );

  const small = () => (
    <Tooltip label={!isDisabled ? label : "You must be signed in"}>
      <IconButton
        icon={icons[label]}
        aria-label={`${label} button`}
        {...btnProps}
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

interface SearchProps {
  isDark: boolean;
  isDisabled: boolean;
}

const SearchInput = ({ isDark, isDisabled }: SearchProps) => {
  const placeholderColor = isDark ? "gray.300" : "gray.500";
  return (
    <Tooltip label="You must be signed in" isDisabled={!isDisabled}>
      <InputGroup maxW="400px">
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
