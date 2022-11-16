import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import { fetchOrders } from "store/orderSlice";
import OrdersList from "components/OrdersList";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Tabs>
      <TabList>
        <Tab>Positions</Tab>
        <Tab>Orders</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>POSITIONS GO HERE</TabPanel>
        <TabPanel>
          <OrdersList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
