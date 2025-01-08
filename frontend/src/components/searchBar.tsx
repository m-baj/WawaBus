import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  VStack,
  HStack,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { li } from "framer-motion/client";

const lineNumbers = [144, 167, 210, 213, 669, 712];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredLines, setFilteredLines] = useState<number[]>([]);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input) {
      // Filter lineNumbers based on input
      const filtered = lineNumbers.filter((line) =>
        line.toString().startsWith(input)
      );
      setFilteredLines(filtered);
    } else {
      setFilteredLines([]);
    }
  };

  const handleSelectLine = (line: number) => {
    if (!selectedLines.includes(line)) {
      setSelectedLines((prev) => [...prev, line]); // Add the line to selected lines
    }
    setQuery("");
    setFilteredLines([]);
  };

  const handleRemoveLine = (line: number) => {
    setSelectedLines((prev) => prev.filter((item) => item !== line)); // Remove the line
  };

  return (
    <Box position="relative" width="100%">
      <InputGroup borderRadius={5} _focusVisible={{ borderColor: "blue.500" }}>
        {selectedLines.length > 0 && (
          <InputLeftElement
            padding={0}
            display="flex"
            alignItems="center"
            borderLeftRadius={5}
            borderRight={0}
            borderColor="gray.450"
            flexWrap="wrap"
            width="auto"
          >
            <HStack spacing={1} pl={1}>
              {selectedLines.map((line) => (
                <Box
                  key={line}
                  bg="blue.500"
                  color="white"
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                >
                  <Button
                    size="xs"
                    variant="ghost"
                    color="white"
                    onClick={() => handleRemoveLine(line)}
                  >
                    {line}
                  </Button>
                </Box>
              ))}
            </HStack>
          </InputLeftElement>
        )}
        <Input
          type="text"
          placeholder="Wpisz numer linii"
          value={query}
          onChange={handleInputChange}
          border="1px solid #949494"
          borderRadius={5}
          _hover={{ borderColor: "gray.450" }}
          pl={
            selectedLines.length > 0
              ? `${selectedLines.length * 2.5}rem`
              : "0.5rem"
          }
        />
        <InputRightElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
      </InputGroup>
      {filteredLines.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          zIndex={9999}
          bg="gray.100"
          border="1px solid #949494"
          borderRadius="5px"
          width="100%"
          maxHeight="150px"
          overflowY="auto"
          spacing={0}
          mt={1}
          boxShadow="lg"
        >
          {filteredLines.map((line) => (
            <Box
              key={line}
              as="button"
              width="100%"
              textAlign="left"
              px={3}
              py={2}
              _hover={{ bg: "gray.100" }}
              onClick={() => handleSelectLine(line)}
            >
              {line}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SearchBar;
