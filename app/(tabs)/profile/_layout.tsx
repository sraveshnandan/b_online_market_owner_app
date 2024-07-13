
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack screenOptions={{
            animation: "ios",
        }}>
            <Stack.Screen options={{ headerTitle: "Account" }} name="index" />
            <Stack.Screen name="updateProfile" />
            <Stack.Screen name="orders" />
            <Stack.Screen name="wallet" />
            <Stack.Screen name="refer_earn" />
        </Stack>
    )
}