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
    <Text fontSize="xl" fontWeight="600" lineHeight={1}>
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
    <Stack align="start" w="100%" pt="1.5rem" h="100%" px="1rem">
      {header()}
      <TableContainer w="100%" h="100%">
        <Table w="100%" h="100%" p={0} size="sm">
          <Thead h="41px" w="100%">
            <Tr w="100%">
              <Th>Activity</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>

          <Tbody p={0} w="100vw" h="calc(100% - 195px)" maxH="100%">
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
                        <Td isNumeric>
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
