import {
    DimensionValue,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, {
    Dispatch,
    SetStateAction,
    useLayoutEffect,
    useState,
} from "react";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { IProduct } from "@/types";
import { useDispatch } from "react-redux";


type Props = {
    pr: IProduct;
    showPrev?: boolean;
    setShowPrev?: Dispatch<SetStateAction<boolean>>;
    setprevImg?: Dispatch<SetStateAction<string>>;
    cardWidth?: DimensionValue | undefined;
};

const ProductCard = ({ pr, setShowPrev, setprevImg, cardWidth }: Props) => {
    const dispatch = useDispatch();
    const cart: any[] = []
    const wishlist: any[] = []
    // Local state management
    const [liked, setliked] = useState<boolean>(false);
    const [addedToCart, setaddedToCart] = useState<boolean>(false);
    // setting all cart item of wishlist data
    useLayoutEffect(() => {
        // setting liked state
        const wishlistData = wishlist.findIndex((item) => item.id === pr._id);
        if (wishlistData === -1) {
            setliked(false);
        } else {
            setliked(true);
        }
        // setting up cart boolean data
        const data = cart.findIndex((item) => item.product.id === pr._id);
        if (data === -1) {
            setaddedToCart(false);
        } else {
            setaddedToCart(true);
        }
    }, [cart.length, wishlist.length]);

    // final return statement
    return (
        <View
            style={[cardWidth ? { width: cardWidth } : null]}
            className="w-[45%] items-center overflow-hidden rounded-md bg-white h-[220] m-2 p-1"
        >
            {/* Product CTA Action  */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingLeft: 8,
                }}
            >
                <Ionicons
                    name={liked ? "heart-sharp" : "heart-outline"}
                    size={28}
                    color={Colors.Red}
                    onPress={() => {

                        setliked((prev) => !prev);
                    }}
                />
            </View>

            {/* product Image  */}
            <TouchableOpacity
                onPress={() => {
                    if (setShowPrev && setprevImg) {
                        setprevImg(pr?.banners[0].url!);
                        setShowPrev((prev) => !prev);
                    }
                    return;
                }}
                style={{ width: 120, height: 120 }}
            >
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                        backfaceVisibility: "visible",
                    }}
                    source={{ uri: pr?.banners[0].url }}
                />
            </TouchableOpacity>

            {/* Product Details  */}
            <TouchableOpacity
                style={{ width: "100%", position: "absolute", bottom: 0 }}
                onPress={() => {
                    router.push(`/(screens)/ProductDetails?product_id=${pr._id}` as any);
                }}
            >
                {/* Product Title  */}
                <Text style={{ fontSize: 20, textAlign: "left" }}>
                    {pr?.name?.substring(0, 10)}...
                </Text>

                {/* Product Price Section  */}

                <Text
                    style={{
                        textDecorationLine: "line-through",
                        fontWeight: "600",
                        color: Colors.Red,
                    }}
                >
                    ₹{pr.originalPrice}
                </Text>

                <Text
                    style={{
                        fontWeight: "600",
                        color: "green",
                        fontSize: 22,
                    }}
                >
                    ₹{pr.discountPrice}
                </Text>
            </TouchableOpacity>

            {/* Add to cart button  */}

            <TouchableOpacity
                style={[
                    {
                        position: "absolute",
                        backgroundColor: Colors.Primary,
                        bottom: 0,
                        right: 0,
                        padding: 8,
                        borderTopLeftRadius: 6,
                    },
                    addedToCart ? { backgroundColor: "green" } : null,
                ]}
                onPress={() => {
                    if (addedToCart) {
                        // dispatch event 
                        setaddedToCart((prev) => !prev);
                    } else {
                        // dispatch event 
                        setaddedToCart((prev) => !prev);
                    }
                }}
            >
                <Ionicons
                    name={addedToCart ? "checkmark" : "add-sharp"}
                    size={28}
                    color={Colors.White}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;