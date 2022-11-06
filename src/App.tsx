import { Routes, Route } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

// import useSelector from "hooks/useSelector";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Navbar from "components/Navbar";

function App() {
  const mainBg = useColorModeValue("#fff", "gray.900");

  // const { authenticated } = useSelector((st) => st.user);

  return (
    <Box minH="100vh" bg={mainBg}>
      <Navbar />
      <Box h="100%" w="100%" position="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
