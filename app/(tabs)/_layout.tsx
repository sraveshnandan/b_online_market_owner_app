
import { Colors, tintColorLight } from "@/constants"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
export default function AuthLayout() {
    const wishlistProduct = ["ww", "ss"]
    const wishlistShop = [22, 22, 222]
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: tintColorLight, tabBarInactiveTintColor: Colors.light.icon }}>

            {/* home tab  */}
            <Tabs.Screen name="home" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "home" : "home-outline"} color={color} size={30} />
                ),
                tabBarShowLabel: false
            }} />

            {/* category tab  */}
            <Tabs.Screen name="category" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "logo-buffer" : "logo-buffer"} color={color} size={30} />
                ),
                tabBarShowLabel: false
            }} />


            {/* Wishlist tab  */}
            <Tabs.Screen name="wishlist" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "heart-outline" : "heart-sharp"} color={color} size={30} />
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
                    <Ionicons name={focused ? "person-sharp" : "person-outline"} color={color} size={30} />
                ),
                tabBarShowLabel: false
            }} />

        </Tabs>
    )
}