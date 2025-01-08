"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { Box, Flex, Stack, Heading, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";

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
          <Heading>Witamy na stronie WawaBus!</Heading>
          <Text>Filtruj wyświetlane linie</Text>
          <Flex width="60%" justifyContent="center">
            <SearchBar />
          </Flex>
          <Box
            width="100%" // Szerokość będzie zależała od rodzica
            maxWidth="1000px" // Maksymalna szerokość mapy
            aspectRatio={1} // Stosunek szerokości do wysokości 1:1
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
