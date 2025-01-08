import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  HStack,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const lineNumbers = [144, 167, 210, 213, 669, 712];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredLines, setFilteredLines] = useState<number[]>([]);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [isListVisible, setIsListVisible] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input) {
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
      setSelectedLines((prev) => [...prev, line]);
    }
    setQuery("");
    setFilteredLines([]);
  };

  const handleRemoveLine = (line: number) => {
    setSelectedLines((prev) => prev.filter((item) => item !== line));
  };

  const handleBlur = () => {
    setIsListVisible(false);
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
                <Button
                  key={line}
                  size="sm"
                  onClick={() => handleRemoveLine(line)}
                  bgColor="blue.500"
                  border="none"
                  px="calc(0.5rem - 1px)"
                  _hover={{
                    border: "1px solid",
                    borderColor: "red.500",
                  }}
                >
                  <Text color="white">{line}</Text>
                </Button>
              ))}
            </HStack>
          </InputLeftElement>
        )}
        <Input
          type="text"
          placeholder="Filtruj wyświetlane linie"
          value={query}
          onChange={handleInputChange}
          border="1px solid #949494"
          onFocus={() => setIsListVisible(true)}
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
      {isListVisible && filteredLines.length > 0 && (
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
          onBlur={handleBlur}
        >
          {filteredLines.map((line) => (
            <Box
              key={line}
              as="button"
              width="100%"
              textAlign="left"
              px={3}
              py={2}
              _hover={{ bg: "gray.200" }}
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
