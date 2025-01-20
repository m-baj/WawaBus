"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { Box, Flex, Stack, Heading, Center, Spinner, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Map = dynamic(() => import("@/components/map"), { ssr: false });
interface DecodedToken {
  id: number;
  email: string;
  exp: number;
}

export default function MapPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("access_token");
          setIsAuthenticated(false);
          router.push("/auth/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/auth/login");
      }
    } else {
      setIsAuthenticated(false);
      router.push("/auth/login");
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <Stack
          p={4}
          spacing={4}
          width="100%"
          maxWidth="1200px"
          alignItems="center"
        >
          <Heading as="h1" textAlign="center">
            Witamy na stronie WawaBus!{" "}
          </Heading>
          <Heading size="md" textAlign="center">
            Sprawdź aktualne położenie autobusów w Warszawie
          </Heading>

          <Flex width="60%" justifyContent="center">
            <SearchBar />
          </Flex>
          <Box
            width="100%"
            maxWidth="1000px"
            aspectRatio={1}
            border="1px solid #ccc"
          >
            <Map />
          </Box>
        </Stack>
      </div>
      <Footer />
    </>
  );
}
