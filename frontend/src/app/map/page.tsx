"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { Box, Flex, Stack, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function MapPage() {
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('token');
        if (token) {
          return token;
        }
      }

      const searchParams = new URLSearchParams(window.location.search);
      const queryToken = searchParams.get('token');
      if (queryToken) {
        return queryToken;
      }

      return null;
    };

    const token = getTokenFromUrl();

    if (token) {
      localStorage.setItem('token', token);
      console.log('Token zapisany w localStorage:', token);

      if (window.history.replaceState) {
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState(null, '', newUrl);
      } else {
        window.location.hash = '';
      }
    }
  }, [router]);

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
            <SearchBar
              selectedLines={selectedLines}
              setSelectedLines={setSelectedLines}
              lineNumbers={lineNumbers}
            />
          </Flex>
          <Box
            width="100%"
            maxWidth="1000px"
            aspectRatio={1}
            border="1px solid #ccc"
          >
            <Map
              selectedLines={selectedLines}
              lineNumbers={lineNumbers}
              setLineNumbers={setLineNumbers}
            />
          </Box>
        </Stack>
      </div>
      <Footer />
    </>
  );
}
