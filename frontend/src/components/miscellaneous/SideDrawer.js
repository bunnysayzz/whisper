import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../Context/chat-context";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Input, Spinner } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import { FaComment , FaUserCircle, FaSignOutAlt} from 'react-icons/fa'; // Importing chat icon

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = useContext(ChatContext);

  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInformation");
    navigate("/");
  };

  const handleSearch = async() => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      };

      const { data } = await axios.get(`https://wishperbackend.onrender.com/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChatCreateChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`https://wishperbackend.onrender.com/api/chat`, { userId }, config);

      if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]); 
      setSelectedChat(data);
      setLoadingChat(false);
      onClose(); //drawer close afterwards
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <React.Fragment>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="purple.600"
        bg="yellow.400"
        color="black"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" bg ='blue.700' onClick={onOpen} color="white"
            _hover={{ background: "purple.800", color:"yellow.400" }} _active={{ background: "purple.800", color:"yellow.400" }}>
              <FaComment size={20} /> {/* Chat Icon */}
              <Text d={{ base: "none", md: "flex" }} px={4} fontWeight="bold">
                Search User
              </Text>
          </Button>
        </Tooltip>
        <Text fontSize="3xl" fontFamily="Work sans bold" fontWeight='bold' color="purple.700" display="flex" alignItems="center">
  <FaComment size={30} style={{ verticalAlign: "middle" }} /> {/* Chat Icon */}
  <span style={{ verticalAlign: "middle" }}> Wishper</span>
</Text>


<div>
  {/* Notification Menu */}
  <Menu>
    <MenuButton p={1} position="relative">
      <NotificationBadge count={notification.length} effect={Effect.SCALE} />
      <BellIcon fontSize="2xl" m={1} color="blue.700" />
    </MenuButton>
    <MenuList pl={2} bg="white" boxShadow="md" borderRadius="md">
      {!notification.length && (
        <MenuItem>No New Messages</MenuItem>
      )}
      {notification.map((notif) => (
        <MenuItem
          key={notif._id}
          onClick={() => {
            setSelectedChat(notif.chat);
            setNotification(notification.filter((n) => n !== notif));
          }}
        >
          {notif.chat.isGroupChat
            ? `New Message in ${notif.chat.chatName}`
            : `New Message from ${getSender(user, notif.chat.users)}`}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>

  {/* Profile Menu */}
  <Menu>
    <MenuButton
      as={Button}
      bg="blue.700"
      rightIcon={<ChevronDownIcon />}
      _hover={{ background: "purple.800", color: "yellow.400" }}
      _active={{ background: "purple.800", color: "yellow.400" }}
    >
      <Avatar
        size="sm"
        cursor="pointer"
        name={user.name}
        borderColor="black"
        borderWidth="2px"
        bg="yellow.400"
        color="black"
      />
    </MenuButton>
    <MenuList bg="purple.600" borderColor="black" borderWidth="2px">
      <ProfileModal user={user}>
        <MenuItem
          fontWeight="bold"
          color="black"
          _hover={{ background: "yellow.400" }}
        >
          <FaUserCircle style={{ marginRight: "0.5rem" }} /> My Profile
        </MenuItem>{" "}
      </ProfileModal>
      <MenuDivider />
      <MenuItem
        fontWeight="bold"
        color="black"
        onClick={logoutHandler}
        _hover={{ background: "yellow.400" }}
      >
        <FaSignOutAlt style={{ marginRight: "0.5rem" }} /> Logout
      </MenuItem>
    </MenuList>
  </Menu>
</div>

      </Box>


      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
  <DrawerOverlay />
  <DrawerContent bg="purple.700" color="white">
    <DrawerHeader borderBottomWidth="1px" fontSize="xl" fontWeight="bold">
      Search Users
    </DrawerHeader>
    <DrawerBody>
      <Box d="flex" alignItems="center" pb={4}>
        <Input
          placeholder="Type name or email"
          mr={2}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="white"
          color="purple.700"
          _placeholder={{ color: "gray.500" }}
        />
        <Button
          onClick={handleSearch}
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
        >
          Search
        </Button>
      </Box>
      {loading ? (
        <ChatLoading />
      ) : (
        searchResult?.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChatCreateChat(user._id)}
          />
        ))
      )}
      {loadingChat && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white"
          size="lg"
          mt={4}
        />
      )}
    </DrawerBody>
  </DrawerContent>
</Drawer>

    </React.Fragment>
  );
};

export default SideDrawer;
