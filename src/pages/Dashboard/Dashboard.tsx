import React, { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
} from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import { fetchCalendarData } from "store/calendarSlice";
import { fetchOrders } from "store/orderSlice";
import OrdersList from "components/OrdersList";
import PositionsList from "components/PositionsList";
import PositionsChart from "components/PositionsChart";
import OrderModal from "components/Modals/OrderModal";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCalendarData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Tabs h="calc(100vh - 108px)" pt="1rem" isFitted>
        <TabList h="42px">
          <Tab>Positions</Tab>
          <Tab>Orders</Tab>
        </TabList>

        <TabPanels
          h="calc(100vh - 118px)"
          overflowY="hidden"
          // border="1px solid white"
        >
          {/* Maybe set overflowY: "auto" here (on TabPanel) */}
          <TabPanel
            // border="1px solid red"
            h="100%"
            pb={0}
          >
            <Flex
              h="100%"
              direction="column"
              w="100%"
              // border="1px solid purple"
            >
              <Box
                // border="1px solid orange"
                minH="180px"
                //
                flex={1.25}
              >
                <PositionsList />
              </Box>

              <Box
                mt="1rem"
                // border="1px solid green"
                minH="300px"
                //
                flex={2}
              >
                <PositionsChart />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel h="100%">
            <OrdersList />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <OrderModal />
    </React.Fragment>
  );
};

export default Dashboard;
