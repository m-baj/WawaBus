import React, { useState } from "react";
import {
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const lineNumbers = [14, 167, 210, 213, 669];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredLines, setFilteredLines] = useState<number[]>([]);

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
    setQuery(line.toString());
    setFilteredLines([]);
  };
  return (
    <Box position="relative">
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          type="text"
          placeholder="Wpisz numer linii"
          value={query}
          onChange={handleInputChange}
          border="1px solid #949494"
        />
        <InputRightAddon p={0} border="none">
          <Button
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
          >
            Szukaj
          </Button>
        </InputRightAddon>
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
