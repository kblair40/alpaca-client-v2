import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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

        <TabPanels h="calc(100vh - 118px)" overflowY="hidden">
          <TabPanel>
            <PositionsList />
            <PositionsChart />
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
