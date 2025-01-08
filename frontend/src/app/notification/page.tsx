"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import { Box, Stack } from "@chakra-ui/react";
import NotificationForm from "@/components/notificationForm";

export default function NotificationPage() {
    return (
        <Stack direction="column" spacing={1} minHeight="100vh">
            <Box flex="1">
                <NavBar />
                <Box h="100%" display="flex" justifyContent="center" alignItems="center" mt={8} mb={8}>
                    <NotificationForm />
                </Box>
            </Box>
            <Footer />
        </Stack>
    );
}