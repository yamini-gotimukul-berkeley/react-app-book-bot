import { Heading, Flex } from "@chakra-ui/react";
import bground from "../assets/Banner.png";

const Header = () => {
  return (
    
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#f1f1f1"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >

    <Flex align="center" as="nav" mr={3} >
    <img src={bground} width="10%" height="100px"/>  
    <Heading as="h1" size="sm" paddingLeft="10">  Welcome to Book Bot AI!</Heading>
    </Flex>

    </Flex>
  );
};

export default Header;
