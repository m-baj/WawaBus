"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const Links = ["Moje powiadomienia"];

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      <Link href="/notifications_list">{children}</Link>
    </Box>
  );
};

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = "Username";

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box w="30%">
              <Image src="/assets/WawaBus.png"></Image>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"blue"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              <Box
                display={{ base: "none", md: "inline" }}
                onClick={() => redirect("/notification")}
              >
                Nowe powiadomienie
              </Box>
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar color="gray.300" size={"sm"} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} />
                </Center>
                <br />
                <Center>{username}</Center>
                <br />
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
