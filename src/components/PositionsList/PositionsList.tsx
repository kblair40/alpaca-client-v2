import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  HStack,
  VStack,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { type Position } from "utils/types/position";
import { ChevronDownIcon } from "utils/icons";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { chartActions, fetchTickerData } from "store/chartSlice";
import {
  fetchPositions,
  fetchQuote,
  positionActions,
} from "store/positionSlice";
import { convertToCurrency } from "utils/helpers";
import PositionDrawer from "./PositionDrawer";
// import QuestionBubble from "components/QuestionBubble";

const COLUMN_LABELS = [
  {
    label: "Symbol",
    isNumeric: false,
  },
  {
    label: "Qty",
    isNumeric: true,
  },
  {
    label: "Avg. Entry Price",
    isNumeric: true,
  },
  {
    label: "Cost",
    isNumeric: true,
  },
  {
    label: "Mkt Value",
    isNumeric: true,
  },
  {
    label: "Day Gain ($)",
    isNumeric: true,
  },
  {
    label: "Day Gain (%)",
    isNumeric: true,
  },
  {
    label: "Gain (%)",
    isNumeric: true,
  },
  {
    label: "Gain (%)",
    isNumeric: true,
  },
  {
    label: "Manage",
    isNumeric: false,
  },
];

const PositionsList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { status, data: positions } = useSelector((st) => st.position);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    if (!drawerOpen) {
      dispatch(positionActions.removeSelectedPosition());
      dispatch(chartActions.clearChart());
    }
  }, [drawerOpen, dispatch]);

  const unrealizedGain = (gain: string) => {
    let intGain: number | string = parseFloat(gain);
    intGain = parseFloat(intGain.toLocaleString("en-US"));
    if (intGain >= 0) {
      return intGain.toFixed(2);
    } else {
      return `(${intGain.toFixed(2)})`;
    }
  };
  const handleClickManage = async (position: Position) => {
    dispatch(fetchQuote(position.symbol));
    dispatch(positionActions.setSelectedPosition(position));
    setDrawerOpen(true);

    dispatch(fetchTickerData({ symbol: position.symbol, timeframe: "1D" }));
  };

  const assetClassMap: { [key: string]: string } = {
    us_equity: "Equity",
  };

  if (status === "loading") {
    return (
      <Center h="100px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box minW="340px" w="100%" h="100%">
      <PositionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <TableContainer h="100%" w="100%">
        <Table size="sm">
          <Thead>
            <Tr>
              {COLUMN_LABELS.map((label, i) => {
                return <Td isNumeric={label.isNumeric}>{label.label}</Td>;
              })}
            </Tr>
          </Thead>

          <Tbody>
            {status === "completed" && positions && positions.length
              ? positions.map((pos, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{pos.symbol}</Td>
                      <Td>{pos.qty}</Td>
                      <Td>{convertToCurrency(pos.avg_entry_price)}</Td>
                      <Td>{pos.symbol}</Td>
                      <Td>{convertToCurrency(pos.market_value)}</Td>
                      <Td>{convertToCurrency(pos.unrealized_intraday_pl)}</Td>
                      <Td>{pos.unrealized_intraday_plpc}</Td>
                      <Td>{convertToCurrency(pos.unrealized_pl)}</Td>
                      <Td>{pos.unrealized_plpc}</Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PositionsList;
