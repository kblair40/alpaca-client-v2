import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import WatchlistSectionMenu from "components/Drawer/DrawerSection/SectionMenus/WatchlistSectionMenu";
import { MoreHorizontalIcon } from "utils/icons";

type Props = {
  label: "watchlists" | "index etfs";
  children?: React.ReactNode;
};

const DrawerSection = ({ children, label }: Props) => {
  return (
    <Box>
      <Flex justify={{ md: "space-between" }} align={{ md: "center" }}>
        <Text fontWeight={700} textTransform="uppercase" fontSize="15px">
          {label}
        </Text>
        <WatchlistSectionMenu />
      </Flex>

      <Box pt="8px">{children}</Box>
    </Box>
  );
};

export default DrawerSection;
