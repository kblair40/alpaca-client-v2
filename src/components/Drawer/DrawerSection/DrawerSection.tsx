import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import WatchlistSectionMenu from "components/Drawer/DrawerSection/SectionMenus/WatchlistSectionMenu";
import IndexEtfSectionMenu from "components/Drawer/DrawerSection/SectionMenus/IndexEtfSectionMenu";

type Props = {
  label: "watchlists" | "index etfs";
  children?: React.ReactNode;
  width?: any;
  padding?: any;
};

const MENUS = {
  watchlists: <WatchlistSectionMenu />,
  "index etfs": <IndexEtfSectionMenu />,
};

const DrawerSection = ({
  children,
  label,
  width = { base: "100%", md: "unset" },
  padding = "none",
}: Props) => {
  return (
    <Box
      w={width}
      // border="1px solid white"
      padding={padding}
      // overflowX="auto"
      // pb={{base: "8"}}
      //
    >
      <Flex justify={{ md: "space-between" }} align={{ md: "center" }}>
        <Text
          mr={{ base: "1rem", md: 0 }}
          fontWeight={700}
          textTransform="uppercase"
          fontSize="15px"
        >
          {label}
        </Text>
        {MENUS[label]}
      </Flex>

      <Box
        pt={{ base: "4px", md: "8px" }}
        overflowX="auto"
        border="1px solid white"
        // w="100%"
        //
      >
        {children}
      </Box>
    </Box>
  );
};

export default DrawerSection;
