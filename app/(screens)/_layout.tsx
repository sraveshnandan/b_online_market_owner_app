import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ScreenLayouts = () => {
    return (
        <Stack screenOptions={{ animation: "slide_from_bottom" }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='createProduct' options={{ headerTitle: "Create New Product" }} />
            <Stack.Screen name='privacy-policy' options={{ headerTitle: "Privacy Policy" }} />
            <Stack.Screen name='orders' options={{ headerTitle: "Your Orders" }} />
            <Stack.Screen name='products' options={{ headerTitle: "Your Products" }} />
            <Stack.Screen name='wallet' options={{ headerTitle: "Your Wallet Balence" }} />
            <Stack.Screen name='editShop' options={{ headerTitle: "Update your shop details" }} />
            <Stack.Screen name='UpdateOrderStatus' options={{ headerTitle: "Update Order Status" }} />
            <Stack.Screen name='OrderInfo' options={{ headerTitle: "Order Info" }} />
            <Stack.Screen name='Refer&Earn' />
        </Stack>
    )
}

export default ScreenLayouts