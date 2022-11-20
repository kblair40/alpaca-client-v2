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
    <Text fontSize="xl" fontWeight="600">
      Account Activities
    </Text>
  );

  const calculateActivityCost = (qty: string, price: string) => {
    let intQty = parseFloat(qty);
    let intPrice = parseFloat(price);
    return convertToCurrency(intQty * intPrice);
    // return 0;
    // return (intQty * intPrice).toLocaleString();
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
    <Stack align="start" w="100%" mt="2rem">
      {header()}

      <TableContainer w="100%">
        <Table w="100%">
          <Thead>
            <Tr>
              <Th>Activity</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>

          <Tbody>
            {activitiesStatus === "completed" && !!activities
              ? activities.map((activity: any, i: number) => {
                  return (
                    <Tr key={i}>
                      <Td>
                        <Text textTransform="capitalize">{`${activity.side} ${activity.qty} ${activity.symbol}`}</Text>
                      </Td>
                      <Td>
                        <Text>
                          {dayjs(activity.timestamp).format(dateFormat)}
                        </Text>
                      </Td>
                      <Td>
                        {/* <Text>{activity.symbol}</Text> */}
                        <Text>
                          {calculateActivityCost(activity.qty, activity.price)}
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
