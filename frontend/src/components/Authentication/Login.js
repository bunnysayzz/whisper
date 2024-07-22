import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // React icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

const MotionButton = motion(Button); // Wrap Button component with motion for animations

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "https://wishperbackend.onrender.com/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInformation", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          borderRadius="lg"
          borderColor="gray.300" // Updated color
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            borderRadius="lg"
            borderColor="gray.300" // Updated color
          />
          <InputRightElement width="4.5rem">
            <Button
              colorScheme="blue" // Updated color
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              borderRadius="lg"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <MotionButton
        fontWeight="bold"
        colorScheme="green" // Updated color
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        borderRadius="lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </MotionButton>
      <Button
        fontWeight="bold"
        variant="solid"
        colorScheme="yellow"
        width="100%"
        onClick={() => {
          setEmail("azhar@lpu.in");
          setPassword("Lpu@69");
        }}
        borderRadius="lg"
        marginTop="10px"
      >
        Guest User Login
      </Button>
    </VStack>
  );
};

export default Login;
