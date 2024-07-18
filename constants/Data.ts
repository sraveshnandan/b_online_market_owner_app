import { Dimensions } from "react-native"


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window")


const wp = (value: number): number => {
    return ScreenWidth / 100 * value
}


const hp = (value: number): number => {
    return ScreenHeight / 100 * value
}

const API_URL = "https://bom-api-1-0-1.onrender.com/api/v1"
// const API_URL = "https://amazing-humbly-grub.ngrok-free.app/api/v1"


const ProfileMenu: { name: string, link: string, icon: string }[] = [
    {
        name: "Cart",
        link: "/(screens)/cart",
        icon: "cart-outline"
    },
    {
        name: "Orders",
        link: "/(tabs)/profile/orders",
        icon: "inbox-multiple"
    },
    {
        name: "Wallet",
        link: "/(tabs)/profile/wallet",
        icon: "wallet"
    },
    {
        name: "Refer & Earn",
        link: "/(tabs)/profile/refer_earn",
        icon: "gold"
    }

]


const APP_VERSION = "1.0.0"

export { ScreenWidth, ScreenHeight, wp, hp, API_URL, ProfileMenu, APP_VERSION }