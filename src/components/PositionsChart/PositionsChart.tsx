import { useEffect, useState } from "react";
import { Box, Spinner, Center, Flex, Text } from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { fetchAccount } from "store/accountSlice";

type Props = {};

const PositionsChart = () => {
  const dispatch = useDispatch();

  const { data, status } = useSelector((st) => st.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Center h="120px">
        <Spinner />
      </Center>
    );
  }

  if (!data) return <Text>NO DATA</Text>;

  return <div>PositionsChart</div>;
};

export default PositionsChart;
