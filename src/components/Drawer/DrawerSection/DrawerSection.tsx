import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import WatchlistSectionMenu from "components/Drawer/DrawerSection/SectionMenus/WatchlistSectionMenu";
import IndexEtfSectionMenu from "components/Drawer/DrawerSection/SectionMenus/IndexEtfSectionMenu";

type Props = {
  label: "watchlists" | "index etfs";
  children?: React.ReactNode;
};

const MENUS = {
  watchlists: <WatchlistSectionMenu />,
  "index etfs": <IndexEtfSectionMenu />,
};

const DrawerSection = ({ children, label }: Props) => {
  return (
    <Box>
      <Flex justify={{ md: "space-between" }} align={{ md: "center" }}>
        <Text fontWeight={700} textTransform="uppercase" fontSize="15px">
          {label}
        </Text>
        {MENUS[label]}
      </Flex>

      <Box pt="8px">{children}</Box>
    </Box>
  );
};

export default DrawerSection;
