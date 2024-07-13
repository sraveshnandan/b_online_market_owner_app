
import { Colors, tintColorLight } from "@/constants"
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
export default function AuthLayout() {
    const wishlistProduct = ["ww", "ss"]
    const wishlistShop = [22, 22]
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarActiveTintColor: tintColorLight, tabBarInactiveTintColor: Colors.Gray }}>

            {/* home tab  */}
            <Tabs.Screen name="home" options={{
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={34} />
                ),
                tabBarShowLabel: false
            }} />

            {/* category tab  */}
            <Tabs.Screen name="category" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "logo-buffer" : "logo-buffer"} color={color} size={28} />
                ),
                tabBarShowLabel: false
            }} />


            {/* Wishlist tab  */}
            <Tabs.Screen name="wishlist" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "heart-sharp" : "heart-outline"} color={color} size={28} />
                ),
                tabBarShowLabel: false,
                tabBarBadge: wishlistProduct.length + wishlistShop.length,
                tabBarBadgeStyle: {
                    display: wishlistProduct.length || wishlistShop.length ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center"
                }
            }} />

            {/* profile tab  */}
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "person-sharp" : "person-outline"} color={color} size={28} />
                ),
                tabBarShowLabel: false
            }} />

        </Tabs>
    )
}