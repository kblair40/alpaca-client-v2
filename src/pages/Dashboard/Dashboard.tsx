import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import { fetchOrders } from "store/orderSlice";
import OrdersList from "components/OrdersList";
import PositionsList from "components/PositionsList";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Tabs h="calc(100vh - 108px)" pt="1rem" isFitted>
      <TabList h="42px">
        <Tab>Positions</Tab>
        <Tab>Orders</Tab>
      </TabList>

      <TabPanels h="calc(100vh - 118px)" overflowY="hidden">
        <TabPanel>
          <PositionsList />
        </TabPanel>
        <TabPanel h="100%">
          <OrdersList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
