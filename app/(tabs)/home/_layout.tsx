
import { tintColorLight } from "@/constants"
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack screenOptions={{ animation: "ios" }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="shop_details" />
        </Stack>
    )
}