import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Disable the default header globally
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="TransactionDetailScreen" />
        </Stack>
    )
}
