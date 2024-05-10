import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));

    if (userInformation) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <MotionBox
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        d="flex"
        justifyContent="center"
        margin="3.2rem 0 1rem 0"
        p={3}
        borderRadius="lg"
        borderColor="black"
        borderWidth="1px"
        w="100%"
        bgGradient="linear(to-r, cyan.400, blue.700)"
        boxShadow="xl"
      >
        <Text
          color="white"
          fontSize="4xl"
          fontFamily="Work Sans"
          fontWeight="bold"
        >
          Wishper
        </Text>
      </MotionBox>
      <Box
        bg="blue.50"
        w="100%"
        p={4}
        borderRadius="lg"
        borderColor="black"
        borderWidth="1px"
        boxShadow="md"
      >
        <Tabs isFitted variant="soft-rounded" colorScheme="cyan">
          <TabList mb="1em">
            <Tab fontWeight="bold">Login</Tab>
            <Tab fontWeight="bold">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
