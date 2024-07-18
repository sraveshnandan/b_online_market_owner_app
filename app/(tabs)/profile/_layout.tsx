
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack screenOptions={{
            animation: "ios",
        }}>
            <Stack.Screen options={{ headerTitle: "Account" }} name="index" />
            <Stack.Screen name="updateProfile" options={{ headerTitle: "Update your profile" }} />
            <Stack.Screen name="orders" options={{ headerTitle: "Your Orders" }} />
            <Stack.Screen name="wallet" options={{ headerTitle: "Your Wallet" }} />
            <Stack.Screen name="refer_earn" options={{ headerTitle: "Refer & Earn" }} />
        </Stack>
    )
}