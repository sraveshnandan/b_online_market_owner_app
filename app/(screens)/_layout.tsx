
import { Stack } from "expo-router"
export default function AuthLayout() {
    return (
        <Stack screenOptions={{ animation: "ios" }}>
            <Stack.Screen name="cart" />
            <Stack.Screen name="ProductDetails" options={{ headerTitle: "Product Details " }} />
            <Stack.Screen name="ShopNow" />
            <Stack.Screen name="withdraw" />
            <Stack.Screen name="productByCategory" />
            <Stack.Screen name="addAddress" options={{ headerTitle: "Add new address" }} />
            <Stack.Screen name="orderSuccess" options={{
                headerTitle: "Order successfull", headerTitleStyle: {
                    color: "green"
                }
            }} />
        </Stack>
    )
}