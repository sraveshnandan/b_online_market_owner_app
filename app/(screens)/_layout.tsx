
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="cart" />
            <Stack.Screen name="ProductDetails" />
            <Stack.Screen name="ShopNow" />
            <Stack.Screen name="withdraw" />
        </Stack>
    )
}