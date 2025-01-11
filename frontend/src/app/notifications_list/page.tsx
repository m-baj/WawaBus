"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { fetchNotifications, deleteNotification } from "@/api-calls/notification";
import NotificationCard from "@/components/notificationCard";

type Notification = {
    id: string;
    line: string;
    stop: string;
    email: string;
    time: string;
    user_id: number;
};

export default function NotificationPage() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const getNotifications = async () => {
            if (user) {
                const data = await fetchNotifications(user.id);
                setNotifications(data);
            }
        };
        getNotifications();
    }, []);

    const handleDelete = async (id: string) => {
        const success = await deleteNotification(id);
        if (success) {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }
    };

    return (
        <Stack direction="column" spacing={1} minHeight="100vh">
            <Box flex="1">
                <NavBar />
                <Box h="100%" display="flex" justifyContent="center" alignItems="center" mt={8} mb={8}>
                    <Stack spacing={4} width="100%" maxW="md">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    id={notification.id}
                                    line={notification.line}
                                    stop={notification.stop}
                                    time={notification.time}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <Text>Brak powiadomień</Text>
                        )}
                    </Stack>
                </Box>
            </Box>
            <Footer />
        </Stack>
    );
}