
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
            <Stack.Screen name="startBusiness" options={{ headerTitle: "Start your bussiness", headerShown: true }} />
            <Stack.Screen name="createShop" options={{
                headerShown: true,
                headerTitle: "Create your shop"
            }} />
        </Stack>
    )
}