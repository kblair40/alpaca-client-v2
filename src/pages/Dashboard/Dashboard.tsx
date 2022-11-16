import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

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
    <div>
      <OrdersList />
    </div>
  );
};

export default Dashboard;
