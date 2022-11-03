import { Routes, Route } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import Home from "./pages/Home";

function App() {
  const mainBg = useColorModeValue("#fff", "gray.900");

  // const {authenticated} =

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
