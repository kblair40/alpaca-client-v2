import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Button, Text, Box } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";

type Props = {};

const Admin = (props: Props) => {
  const { data: userData, status: userDataFetchStatus } = useSelector(
    (st) => st.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.access_level !== "admin") {
      navigate("/");
    }
  }, [userData, navigate]);

  if (
    userDataFetchStatus !== "completed" ||
    !userData ||
    userData.access_level !== "admin"
  ) {
    return (
      <Center h="calc(100vh - 60px)" flexDirection="column">
        <Text mb=".5rem" fontSize="lg" fontWeight="600">
          You shouldn't be here
        </Text>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </Center>
    );
  }

  return <Box>Admin</Box>;
};

export default Admin;
