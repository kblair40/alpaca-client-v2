import { Box } from "@chakra-ui/react";

import Authenticate from "components/Authenticate";
import useSelector from "hooks/useSelector";

const Home = () => {
  const { authenticated } = useSelector((st) => st.user);

  return (
    <Box h="100%">
      {authenticated.local ? (
        <Box>
          <Stuff />
        </Box>
      ) : (
        <Authenticate />
      )}
    </Box>
  );
};

export default Home;

const Stuff = () => {
  return <Box />;
};
