
import { tintColorLight } from "@/constants"
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerBackVisible: true }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}