
import { Colors, tintColorLight } from "@/constants"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
export default function TabsLayout() {

    return (
        <Tabs screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarActiveTintColor: tintColorLight, tabBarInactiveTintColor: Colors.Gray, }}>

            {/* home tab  */}
            <Tabs.Screen name="home" options={{
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={focused ? "storefront" : "storefront-outline"} color={color} size={34} />
                ),
                tabBarLabel: "Shop",
                tabBarLabelStyle: {
                    fontWeight: "800",
                    fontSize: 10
                }
            }} />


            <Tabs.Screen name="Settings" options={{
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={34} />
                ),
                tabBarLabel: "Settings",
                tabBarLabelStyle: {
                    fontWeight: "800",
                    fontSize: 10
                }
            }} />





        </Tabs>
    )
}