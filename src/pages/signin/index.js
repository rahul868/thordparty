import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { parse } from "cookie";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  VStack,
  Input,
  FormControl,
  Button,
  FormLabel,
  Text,
  HStack,
  FormHelperText,
} from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react';
// import RegistrationForm from '_/components/layout/
import styles from "@/styles/Auth/signin.module.css"; //CHANGE
const colors = {
  bigiota: {
    blue: "#7385fb",
  },
};

const poppins = Inter({ weight: "400", subsets: ["latin"] });

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isvalidemail, setIsvalidemail] = useState(true);
  const [isvalidpassword, setIsvalidpassword] = useState(true);
  const [isloading, setIsloading] = useState(false);

  const verifyEmail = () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to clear the form-related state variables
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setIsvalidemail(true);
    setIsvalidpassword(true);
    setIsloading(false);
  };

  const verifyPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}|;:'",<>/`~])[a-zA-Z\d!@#$%^&*()-=_+{}|;:'",<>/`~]{8,}$/;
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password);
  };

  const verifyUser = async () => {
    try {
      setIsloading(true);
      if (!verifyEmail()) {
        setIsvalidemail(false);
        return;
      } else {
        setIsvalidemail(true);
      }

      if (!verifyPassword()) {
        setIsvalidpassword(false);
        return;
      } else {
        setIsvalidpassword(true);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed in login process.");
      }
      const user = await response.json();
      if (user.email && user.access_token) {
        // Set cookies for application use
        // Setting cookies with a max-age of 1 day
        document.cookie = `documentiatoken=${user.access_token}; max-age=${
          60 * 60 * 24
        }`;
        document.cookie = `documentiauser=${JSON.stringify(user)}; max-age=${
          60 * 60 * 24
        }`;
        // Navigate to mainApp
        clearForm();
        return (window.location.href = "/main-app");
      }
      alert("Invalid credentials. Please try again.");
    } catch (err) {
      alert(err);
      clearForm();
    } finally {
      setIsloading(false);
    }
  };

  //   Check token is exist if not then login entry
  useEffect(() => {
    const cookies = parse(document.cookie);
    if (cookies.documentiatoken && cookies.documentiauser) {
      window.location.href = "/main-app";
    }
  }, []);

  return (
    <ChakraProvider>
      <Head>
        <title>Documentia | Sign-In</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
      <main className={`${styles.main} ${poppins.className}`}>
        <Flex className={styles.auth_main}>
          <VStack className={styles.signin_left} padding={"3rem"}>
            <Link href={"/"}>
              <Image
                src={"/assets/images/logo.png"}
                alt="Logo"
                width={280}
                height={60}
              />
            </Link>
            <Text fontSize={"medium"} fontWeight={"bold"} as="h2">
              Please Sign-in to your account
            </Text>
            <FormControl>
              <Box margin={"1rem 0"}>
                <FormLabel>Email</FormLabel>
                <Input
                  size={["sm", "md", "md", "md"]}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isvalidemail ? (
                  <FormHelperText color={"red"}>
                    Please enter valid email
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </Box>
              <Box margin={"1rem 0"}>
                <FormLabel>Password</FormLabel>
                <Input
                  size={["sm", "md", "md", "md"]}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isvalidpassword ? (
                  <FormHelperText color={"red"}>
                    Please create strong password.
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </Box>
              <HStack
                width={"100%"}
                justifyContent={"center"}
                margin={"1rem 0"}
              >
                <Button
                  size={["sm", "md"]}
                  color={"white"}
                  borderRadius={0}
                  backgroundColor={colors.bigiota.blue}
                  onClick={verifyUser}
                  isDisabled={!isloading ? false : true}
                >
                  {!isloading ? "Login" : "Logging..."}
                </Button>

                <Link href={"/signin"}>
                  <Text
                    color={colors.bigiota.blue}
                    fontSize={["small", "medium"]}
                  >
                    Forgot your password
                  </Text>
                </Link>
              </HStack>
              <HStack justifyContent={"center"} marginTop={"4rem"}>
                <Text fontWeight={"500"}>Don&apos;t have and account?</Text>
                <Link href="/signup">
                  <Text color={colors.bigiota.blue}>Register here</Text>
                </Link>
              </HStack>
            </FormControl>
          </VStack>
          <VStack className={styles.signin_right}>
            <Text
              width={"100%"}
              color="white"
              fontSize={"28px"}
              fontWeight={"900"}
            >
              We are more than just a company
            </Text>
            <Text color="white" fontWeight={"500"}>
              Documentia is a proprietary AI-based foundational model which
              generates the foundation for the Generative AI applications like
              ChatGPT, Llama, and Falcon.
            </Text>
          </VStack>
        </Flex>
      </main>
    </ChakraProvider>
  );
}
