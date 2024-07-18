
import { Colors, hp, tintColorLight } from "@/constants"
import { RootState } from "@/redux/store"
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useSelector } from "react-redux"
export default function AuthLayout() {
    const { wishlist } = useSelector((state: RootState) => state.wishlist);
    const { wishlistShop } = useSelector((state: RootState) => state.wishlistShop);
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarActiveTintColor: tintColorLight, tabBarInactiveTintColor: Colors.Gray }}>

            {/* home tab  */}
            <Tabs.Screen name="home" options={{
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={34} />
                ),
                tabBarLabel: "Home",
                tabBarLabelStyle: {
                    fontWeight: "800",
                    fontSize: 10
                }
            }} />

            {/* category tab  */}
            <Tabs.Screen name="category" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "logo-buffer" : "logo-buffer"} color={color} size={28} />
                ),
                tabBarLabel: "Category",
                tabBarLabelStyle: {
                    fontWeight: "800",
                    fontSize: 10
                }
            }} />


            {/* Wishlist tab  */}
            <Tabs.Screen name="wishlist" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "heart-sharp" : "heart-outline"} color={color} size={28} />
                ),
                tabBarLabel: "Wishlit",
                tabBarBadge: wishlist.length + wishlistShop.length,
                tabBarBadgeStyle: {
                    display: wishlist.length ?? wishlistShop.length ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center"
                },
                tabBarLabelStyle: {
                    fontWeight: "800",
                    fontSize: 10
                }
            }} />

            {/* profile tab  */}
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "person-sharp" : "person-outline"} color={color} size={28} />
                ),
                tabBarLabel: "Profile",
                tabBarLabelStyle: {
                    fontWeight: "800",
                    fontSize: 10
                }
            }} />

        </Tabs>
    )
}