import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";

import Home from "./pages/Home";

function App() {
  const mainBg = useColorModeValue("#fff", "gray.900");
  return (
    <Box minH="100vh" bg={mainBg}>
      <Box h="100%" w="100%" position="relative">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
