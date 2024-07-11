import { Dimensions } from "react-native"


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window")


const wp = (value: number): number => {
    return ScreenWidth / 100 * value
}


const hp = (value: number): number => {
    return ScreenHeight / 100 * value
}


export { ScreenWidth, ScreenHeight, wp, hp }