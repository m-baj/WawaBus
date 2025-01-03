"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import { Box, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home() {
  return (
    <Stack direction="column" spacing={0} minHeight="100vh">
      <Box flex="1">
        <NavBar />
        <Box h="100%">
          <Map />
        </Box>
      </Box>
      <Footer />
    </Stack>
  );
}
