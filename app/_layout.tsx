import { Stack } from "expo-router";
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false, // Disable the default header globally
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="TransactionDetailScreen" />
            </Stack>
        </AuthProvider>
    )
}
