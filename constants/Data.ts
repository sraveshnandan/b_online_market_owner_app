import { Dimensions } from "react-native"


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("screen")


const wp = (value: number): number => {
    return ScreenWidth / 100 * value
}


const hp = (value: number): number => {
    return ScreenHeight / 100 * value
}

const API_URL = "https://bom-api-1-0-1.onrender.com/api/v1"
// const API_URL = "https://amazing-humbly-grub.ngrok-free.app/api/v1"


const ShopMenu: { name: string, link: string, icon: string }[] = [
    {
        name: "Orders",
        link: "/(screens)/orders",
        icon: "cart-outline"
    },
    {
        name: "Products",
        link: "/(screens)/products",
        icon: "inbox-multiple"
    },
    {
        name: "Edit Shop",
        link: "/(screens)/editShop",
        icon: "store"
    },
    {
        name: "Wallet",
        link: "/(screens)/wallet",
        icon: "wallet"
    },
    {
        name: "Refer & Earn",
        link: "/(screens)/Refer&Earn",
        icon: "currency-inr"
    },
    {
        name: "Privacy Policy.",
        link: "/(screens)/privacy-policy",
        icon: "security"
    },


]





const APP_VERSION = "1.0.0"

export { ScreenWidth, ScreenHeight, wp, hp, API_URL, ShopMenu, APP_VERSION }