"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { Box, Flex, Stack, Heading, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home() {
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
