import React, { useEffect } from "react";
import {
    Stack,
    Container,
    Text,
    FormControl,
    Input,
    Button,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NotificationFormData } from "@/types";
import { createNotification } from "@/api-calls/notification";
import useCustomToast from "@/hooks/useCustomToast";
import useAuth from "@/hooks/useAuth";

const formatDate = (date: Date): string => {
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const NotificationForm = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<NotificationFormData>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            line: "",
            stop: "",
            email: "",
            time: formatDate(new Date()), // Ustaw domyślną wartość dla time
            user_id: 0,
        },
    });

    useEffect(() => {
        if (user) {
            setValue("email", user.email);
            setValue("user_id", user.id);
        }
    }, [user, setValue]);

    const showToast = useCustomToast();

    const onSubmit = async (data: NotificationFormData) => {
        console.log("Submitting data:", data);
        const response = await createNotification(data);
        console.log("Response:", response);
        if (response.status) {
            showToast("Notification created successfully", "", "success");
        } else {
            showToast("An error occurred", response.message, "error");
        }
    };

    return (
        <Container as="form" maxW="sm" onSubmit={handleSubmit(onSubmit)}>
            <Stack
                gap={4}
                rounded="md"
                p={4}
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
            >
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    Create Notification
                </Text>
                <FormControl id="line" isInvalid={!!errors.line}>
                    <FormLabel>Line</FormLabel>
                    <Input
                        type="text"
                        {...register("line", {
                            required: "Line is required",
                        })}
                        placeholder="Line"
                        variant="filled"
                        required
                    />
                    {errors.line && (
                        <FormErrorMessage>{errors.line.message}</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl id="stop" isInvalid={!!errors.stop}>
                    <FormLabel>Stop</FormLabel>
                    <Input
                        type="text"
                        {...register("stop", {
                            required: "Stop is required",
                        })}
                        placeholder="Stop"
                        variant="filled"
                        required
                    />
                    {errors.stop && (
                        <FormErrorMessage>{errors.stop.message}</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl id="time" isInvalid={!!errors.time}>
                    <FormLabel>Time</FormLabel>
                    <Input
                        type="datetime-local"
                        {...register("time", {
                            required: "Time is required",
                        })}
                        placeholder="Time"
                        variant="filled"
                        required
                    />
                    {errors.time && (
                        <FormErrorMessage>{errors.time.message}</FormErrorMessage>
                    )}
                </FormControl>
                <Button border="1px" isLoading={isSubmitting} type="submit" colorScheme="blue">
                    Register
                </Button>
            </Stack>
        </Container>
    );
};

export default NotificationForm;