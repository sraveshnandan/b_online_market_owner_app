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
import { Colors, hp, wp } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { IProduct } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addProductToWishlist, removeProductToWishlist } from "@/redux/reducers/wishlist.reducers";
import { addProductToCart, removeProductToCart } from "@/redux/reducers/cart.reducers";
import Toast from "react-native-toast-message";


type Props = {
    pr: IProduct;
    showPrev?: boolean;
    setShowPrev?: Dispatch<SetStateAction<boolean>>;
    setprevImg?: Dispatch<SetStateAction<string>>;
    cardWidth?: DimensionValue | undefined;
};

const ProductCard = ({ pr, setShowPrev, setprevImg, cardWidth }: Props) => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state: RootState) => state.cart)
    const { wishlist } = useSelector((state: RootState) => state.wishlist);
    const { authState } = useSelector((state: RootState) => state.auth);

    // Local state management
    const [liked, setliked] = useState<boolean>(false);
    const [addedToCart, setaddedToCart] = useState<boolean>(false);
    // setting all cart item of wishlist data
    useLayoutEffect(() => {
        // setting liked state
        const wishlistData = wishlist.findIndex((item) => item._id === pr._id);
        if (wishlistData === -1) {
            setliked(false);
        } else {
            setliked(true);
        }
        // setting up cart boolean data
        const data = cart.findIndex((item) => item.product._id === pr._id);
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
            className="w-[48%] items-center overflow-hidden rounded-md bg-white h-fit m-1 p-1"
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
                <View className="absolute top-2 right-2 z-50 bg-white rounded-md p-1 shadow-lg shadow-black">
                    <Ionicons
                        name={liked ? "heart-sharp" : "heart-outline"}
                        size={28}
                        color={"red"}
                        onPress={() => {
                            if (!authState) {
                                return Toast.show({
                                    type: "info",
                                    text1: "Unauthorised",
                                    text2: "Please login to perform this operation."
                                })

                            }
                            if (liked) {
                                dispatch(removeProductToWishlist({ ...pr }))
                                setliked((prev) => !prev);
                                return Toast.show({
                                    type: "info",
                                    text1: "Product removed from your wihlist."
                                })
                            } else {
                                dispatch(addProductToWishlist({ ...pr }))
                                setliked((prev) => !prev);
                                return Toast.show({
                                    type: "success",
                                    text1: "Product added to your wihlist."
                                })
                            }
                        }}
                    />
                </View>
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
                style={{ width: 150, height: 150 }}
            >
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        backfaceVisibility: "visible",
                        borderRadius: 12,
                        marginVertical: 4
                    }}
                    source={{ uri: pr?.banners[0].url }}
                />
            </TouchableOpacity>

            {/* Product Details  */}
            <TouchableOpacity
                style={{ width: "100%", marginTop: 8, paddingHorizontal: 4 }}
                onPress={() => {
                    router.push(`/(screens)/ProductDetails?product_id=${pr._id}` as any);
                }}
            >
                {/* Product Title  */}
                <Text style={{ fontSize: 20, textAlign: "left" }}>
                    {pr?.name?.substring(0, 20)}...
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
                    if (!authState) {
                        return Toast.show({
                            type: "info",
                            text1: "Unauthorised",
                            text2: "Please login to perform this operation."
                        })

                    }
                    if (!addedToCart) {
                        // dispatch event 
                        dispatch(addProductToCart({ ...pr }))
                        setaddedToCart(true);
                    } else {
                        // dispatch event 
                        dispatch(removeProductToCart({ ...pr }))
                        setaddedToCart(false);
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