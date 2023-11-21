import { useAuth } from "@/modules/context/userContext";
import { Router, useRouter } from "next/router";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="purple.800"
      color="white"
    >
      <Link href="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            BookPedia
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLoggedIn && (
          <Link href="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLoggedIn ? (
          <Button onClick={onOpen} colorScheme="pink" >
            Login
          </Button>
        ) : (
          <Button
            colorScheme="pink"
            onClick={() => {
              Cookies.remove("isLoggedIn");
              setIsLoggedIn(false);
              router.push("/");

            }}
          >
            Logout
          </Button>
          
          
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await loginUser(e.target.email.value, e.target.password.value);
              Cookies.set("isLoggedIn", true);
              setIsLoggedIn(true);
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="pink" mr={3}>
                Login
              </Button>
              <Link href="/register" onClick={onClose}>
                <Button variant="ghost">
                  Doesn&apos;t Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
