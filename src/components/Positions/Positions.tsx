import { useEffect, useState } from "react";
import { Box, Flex, Text, Center, Spinner } from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { fetchPositions } from "store/positionSlice";

type Props = {};

const Positions = (props: Props) => {
  const { status, data } = useSelector((st) => st.position);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Center h="100px">
        <Spinner />
      </Center>
    );
  }

  return <Box>Positions</Box>;
};

export default Positions;
