"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { form } from "framer-motion/client";
import { getFormattedDateTimeInWarsaw } from "@/utils";

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
        const token = params.get("token");
        if (token) {
          return token;
        }
      }

      const searchParams = new URLSearchParams(window.location.search);
      const queryToken = searchParams.get("token");
      if (queryToken) {
        return queryToken;
      }

      return null;
    };

    const token = getTokenFromUrl();

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token zapisany w localStorage:", token);

      if (window.history.replaceState) {
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      } else {
        window.location.hash = "";
      }
    }
  }, [router]);

  const [dateTime, setDateTime] = useState<string>("");
  const [maxDateTime, setMaxDateTime] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(true);

  useEffect(() => {
    const updateDateTime = () => {
      const formattedDateTime = getFormattedDateTimeInWarsaw();
      setDateTime(formattedDateTime);
      setMaxDateTime(formattedDateTime);
    };

    updateDateTime();
    if (!update) return;

    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, [update]);

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
            Sprawdź położenie autobusów w Warszawie
          </Heading>
          <Text fontSize="lg">Wybierz datę i godzinę:</Text>
          <Flex width="40%" justifyContent="center" alignItems="center" gap={2}>
            <Input
              type="datetime-local"
              value={dateTime.slice(0, 16)}
              onChange={(e) => {
                let selectedTime = e.target.value;
                if (!selectedTime) {
                  const now = new Date();
                  // now.setHours(now.getHours() + 1);
                  selectedTime = now.toISOString().slice(0, 16);
                }
                const formattedIso = `${selectedTime}:00.000Z`;
                setDateTime(formattedIso);
                setUpdate(false);
              }}
              max={maxDateTime.slice(0, 16)}
              required
            />

            {!update && (
              <Button
                colorScheme="blue"
                variant="link"
                onClick={() => {
                  setUpdate(true);
                  setDateTime(getFormattedDateTimeInWarsaw());
                }}
              >
                Resetuj
              </Button>
            )}
          </Flex>

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
              timestamp={dateTime}
            />
          </Box>
        </Stack>
      </div>
      <Footer />
    </>
  );
}
