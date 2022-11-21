import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import useDispatch from "hooks/useDispatch";
import { fetchCalendarData } from "store/calendarSlice";
import { fetchOrders } from "store/orderSlice";
import OrdersList from "components/OrdersList";
import PositionsList from "components/PositionsList";
import PositionsChart from "components/PositionsChart";
import OrderModal from "components/Modals/OrderModal";
import AlpacaAccount from "components/AlpacaAccount";

const TABS: { [key: string]: number } = {
  positions: 0,
  orders: 1,
  account: 2,
};

const Dashboard = () => {
  const params = useParams();

  const [tabIndex, setTabIndex] = useState<number | undefined>(
    params.tab ? TABS[params.tab] : 0
  );
  const dispatch = useDispatch();

  const {
    colors: { gray },
  } = useTheme();
  const borderTopColor = useColorModeValue(gray["200"], gray["600"]);

  useEffect(() => {
    console.log("\n\nPARAMS", params, "\n\n");
  }, [params]);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCalendarData());
  }, [dispatch]);

  const tabStyles = {
    _selected: {
      borderColor: useColorModeValue(gray["600"], gray["100"]),
      fontWeight: 600,
    },
    _active: { bg: undefined },
  };

  return (
    <React.Fragment>
      <Tabs
        h="calc(100vh - 108px)"
        pt="1rem"
        // defaultIndex={1}
        defaultIndex={tabIndex}
        onChange={setTabIndex}
        isFitted
      >
        <TabList h="42px">
          <Tab {...tabStyles}>Positions</Tab>
          <Tab {...tabStyles}>Orders</Tab>
          <Tab {...tabStyles}>Account</Tab>
        </TabList>

        {/* <TabPanels h="calc(100vh - 118px)" overflowY="hidden"> */}
        <TabPanels h="calc(100vh - 120px)" overflowY="auto">
          <TabPanel h="100%" pb={0} px={0} overflowX="hidden">
            <Flex h="100%" direction="column" w="100%">
              <Box minH="180px" flex={1.25} p={0}>
                <PositionsList />
              </Box>

              <Box
                borderTop="1px solid"
                borderColor={borderTopColor}
                mt=".5rem"
                pt=".5rem"
                minH="240px"
                sx={{
                  ".recharts-responsive-container": {
                    maxHeight: "calc(100% - 48px)",
                  },
                }}
                flex={2}
              >
                <PositionsChart />
              </Box>
            </Flex>
          </TabPanel>

          <TabPanel h="100%" p={0}>
            <OrdersList />
          </TabPanel>

          <TabPanel h="100%" p={0}>
            <AlpacaAccount />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <OrderModal />
    </React.Fragment>
  );
};

export default Dashboard;
