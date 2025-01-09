import React from "react";
import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Text,
    Button,
    useDisclosure,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@chakra-ui/react";

interface NotificationCardProps {
    id: string;
    line: string;
    stop: string;
    time: string;
    onDelete: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ id, line, stop, time, onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = () => {
        onDelete(id);
        onClose();
    };

    return (
        <Card
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={onOpen}
            cursor="pointer"
        >
            <CardHeader>
                <Heading size="md">Linia: {line}</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider borderColor="gray.200" />} spacing={3}>
                    <Box>
                        <Text fontSize="lg">
                            Przystanek: {stop}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg">
                            Czas: {time}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button colorScheme="red" mr={3} onClick={handleDelete}>
                    Usuń
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NotificationCard;