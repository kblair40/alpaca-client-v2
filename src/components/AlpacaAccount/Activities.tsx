import { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { fetchAccountActivities } from "store/accountSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { convertToCurrency } from "utils/helpers";

type Props = {};

const Activities = (props: Props) => {
  const dispatch = useDispatch();
  const { activitiesStatus, activities } = useSelector((st) => st.account);

  const dateFormat = "MM/DD/YYYY, hh:mm:ss A";

  useEffect(() => {
    dispatch(fetchAccountActivities());
  }, [dispatch]);

  const header = () => (
    <Text
      fontSize="xl"
      fontWeight="600"
      lineHeight={1}
      // border="1px solid red"
    >
      Account Activities
    </Text>
  );

  const calculateActivityCost = (qty: string, price: string) => {
    let intQty = parseFloat(qty);
    let intPrice = parseFloat(price);

    return convertToCurrency(intQty * intPrice);
  };

  if (activitiesStatus === "loading") {
    return (
      <Center mt="2rem" h="100px">
        {header()}
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack
      align="start"
      w="100%"
      pt="2rem"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      h="100%"
      // overflowY="auto"
      px="1rem"
      border="1px solid red"
    >
      {header()} {/* h-22px + 2rem (from padding-top) = 54px */}
      <TableContainer
        w="100%"
        h="100%"
        // border="1px solid #aaa"
        mt={0}
        p={0}
        position="absolute"
        top="54px"
        left={0}
        right={0}
      >
        <Table w="100%" h="100%" p={0}>
          <Thead
            // p={0}
            // p="0 2rem 0 0"
            h="41px"
            w="calc(100% - 1rem)"
            // top={}
            // border="1px solid orange"
          >
            {/* h-41px */}
            <Tr>
              <Th>Activity</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>

          <Tbody
            p={0}
            overflowY="auto"
            w="100vw"
            h="100%"
            maxH="calc(100% - 95px)"
            position="absolute"
            bottom={0}
            left="1rem"
            top={"54px"}
            right={0}
          >
            {activitiesStatus === "completed" && !!activities
              ? activities
                  .concat(activities)
                  .map((activity: any, i: number) => {
                    return (
                      <Tr key={i} w="100%" textAlign="left">
                        <Td textAlign="left" textTransform="capitalize">
                          {`${activity.side} ${activity.qty} ${activity.symbol}`}
                        </Td>
                        <Td>{dayjs(activity.timestamp).format(dateFormat)}</Td>
                        <Td>
                          {/* <Text>{activity.symbol}</Text> */}
                          <Text>
                            {calculateActivityCost(
                              activity.qty,
                              activity.price
                            )}
                          </Text>
                        </Td>
                      </Tr>
                    );
                  })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Activities;
