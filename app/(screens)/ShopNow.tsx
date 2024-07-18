import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, Colors, ScreenWidth } from "@/constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RootState } from "@/redux/store";
import Toast from "react-native-toast-message";
import { IAddress, IProduct } from "@/types";
import { API } from "@/utils";
import { addNewOrder } from "@/redux/reducers/main.reducers";
import { clearCart } from "@/redux/reducers/cart.reducers";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = {};

const paymentMode = [
    { name: "Online Payment", icon: "cash-outline" },
    { name: "Cash on Delivery", icon: "car-outline" },

];

const shopNow = (props: Props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart);
    const { userData, authToken } = useSelector((state: RootState) => state.auth);

    // local states
    const [cartOriginalPrice, setcartOriginalPrice] = useState<number>(
        cart.reduce((accumulator: any, currentItem: any) => {
            return accumulator + currentItem?.product?.originalPrice!;
        }, 0)
    );

    const [cartDiscountedPrice, setcartDiscountedPrice] = useState<number>(
        cart.reduce((accumulator: any, currentItem: any) => {
            return accumulator + currentItem?.totalPrice;
        }, 0)
    );
    const [promoCodeDiscount, setpromoCodeDiscount] = useState<number>(0);
    const [deliverCharge, setdeliveryCharge] = useState<number>(0);
    const [deliveryAddress, setdeliveryAddress] = useState<IAddress>(userData.address[0]);
    const [userAddressess, setuserAddressess] = useState<IAddress[]>(userData.address)
    const [payIndex, setpayIndex] = useState(0);
    const [products, setproducts] = useState<{ product: IProduct, quantity: number }[]>()

    const [loading, setloading] = useState(false);

    // setting header Data
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Complete Checkout",
            headerTitleAlign: "center",
        });
    }, []);







    useEffect(() => {
        const prd = cart.map((c) => ({ product: c.product._id, quantity: c.quantity }));

        setproducts(prd as any);
    }, [cart]);



    // handling order placeing 


    const handleOrderPlace = async () => {
        // checking if delivery address exists 
        if (!deliveryAddress) {
            return Toast.show({
                type: "error",
                text1: "Please add a delivery address."
            })
        }

        // creating order api body data 
        const apiPayLoad = {
            user: userData._id,
            totalPrice: cartDiscountedPrice,
            address: deliveryAddress,
            payment_mode: payIndex === 0 ? "online" : "cash on deleviry",
            shop: cart[0].product.owner._id,
            products: products
        }
        setloading(true);


        fetch(`${API_URL}/order/create`, {
            headers: {
                token: authToken,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(apiPayLoad),
        }).then((res => res.json())).then((data: any) => {
            setloading(false);
            console.log("data", data);
            setloading(false);
            dispatch(addNewOrder(data.newOrder));
            Toast.show({
                type: "success",
                text1: data.message
            });
            dispatch(clearCart())
            setTimeout(() => {
                return router.push(`/(screens)/orderSuccess?order=${JSON.stringify(data.newOrder)}`)
            }, 1000)
        }).catch((e: any) => {
            setloading(false);
            console.log("err in order", e);
            return Toast.show({
                type: "error",
                text1: "Something went wrong."
            })
        }
        )

















    }

    console.log("user ",userData.address)

    return loading ? (
        <View className="flex-1 items-center justify-center">
            <Animated.View entering={FadeInUp.delay(100).springify()} className={`bg-white rounded-md p-4 w-[80%] mx-auto items-center justify-center`}>
                <MaterialCommunityIcons className="animate-ping duration-300" name="circle-double" color={"green"} size={40} />
                <Text className="text-xl font-semibold text-primary text-center my-4">Your Order is processing, Please wait... </Text>
            </Animated.View>
        </View>
    ) : (
        <>
            <ScrollView className="flex-1">
                {/* Delivery address choose section  */}
                <View className=" w-[96%] self-center p-2">
                    <Text className="text-xl mb-2 font-semibold">
                        Delivery address:
                    </Text>


                    {
                        userAddressess.length ? (
                            <>
                                {userAddressess.map((item, index) => (
                                    <TouchableOpacity onPress={() => { setdeliveryAddress(item) }} key={index} className={`bg-white items-center my-2 flex-row rounded-md p-2 justify-between ${deliveryAddress === item && "border-2 border-primary"}`}>
                                        <MaterialCommunityIcons name="map-marker" color={Colors.Primary} size={28} />
                                        <View className="">
                                            <Text className="font-semibold">{item.appartment_building_no}, {item.city}, {item.landmark}</Text>
                                        </View>
                                        <Ionicons name={"checkmark-circle-sharp"} color={"green"} size={16} />
                                    </TouchableOpacity>
                                ))}

                                <TouchableOpacity onPress={() => router.push(`/(screens)/addAddress`)} className="bg-white items-center flex-row rounded-md p-2 justify-center my-4">
                                    <MaterialCommunityIcons name="plus" color={Colors.Primary} size={28} />
                                    <View className="">
                                        <Text className="font-semibold">Add new address</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity onPress={() => router.push(`/(screens)/addAddress`)} className="bg-white items-center flex-row rounded-md p-2 justify-center my-4">
                                <MaterialCommunityIcons name="plus" color={Colors.Primary} size={28} />
                                <View className="">
                                    <Text className="font-semibold">Add new address</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                </View>

                {/* Payment mode choosing section  */}
                <View className=" w-[96%] self-center p-2">
                    <Text className="text-xl font-semibold">
                        Payment Mode
                    </Text>
                    {paymentMode &&
                        paymentMode.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => setpayIndex(index)}
                                key={index}
                                className={`bg-white my-1 py-4 px-2 rounded-md flex-row items-center justify-start ${payIndex === index && "border-2 border-primary"}`}
                            >
                                <Ionicons name={item.icon as any} size={25} />
                                <Text className="text-lg font-semibold ml-4">{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                </View>

                {/* Order Summary section  */}

                <View className=" w-[96%] self-center p-2">
                    <Text className="text-xl font-semibold" >
                        Order Item:
                    </Text>

                    {/* Main Order details section  */}
                    <View className="w-full bg-white rounded-md mt-2 p-2">
                        {/* small product slider section  */}
                        <ScrollView horizontal className="w-[100%]">
                            {cart &&
                                cart.map((item: any) => (
                                    <TouchableOpacity onPress={() => router.push(`/(screens)/ProductDetails?product_id=${item.product._id}` as any)}
                                        key={item.product.id}
                                        style={{
                                            width: ScreenWidth * 0.82,
                                            padding: 4,
                                            backgroundColor: Colors.CardBg,
                                            borderRadius: 8,
                                            marginRight: 10,
                                            flexDirection: "row",
                                            gap: 4,
                                        }}
                                    >
                                        {/* Product Image  */}
                                        <View className="bg-white ml-4 overflow-hidden rounded-lg  w-[82] h-[82]">
                                            <Image
                                                style={{ width: 80, height: 80, resizeMode: "contain" }}
                                                source={{ uri: item.product.banners[0]?.url }}
                                            />
                                        </View>
                                        {/* Product Details  */}
                                        <View className="flex-grow ml-2">
                                            <Text
                                                className="text-2xl"

                                            >
                                                {item.product.name?.substring(0, 10)}...
                                            </Text>

                                            <View className="w-full flex-row items-center">
                                                <Text className="text-lg">Price:</Text>
                                                <Text className="text-xl  ml-2 font-semibold">
                                                    ₹{item.product.originalPrice}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text className="absolute top-2  right-2 text-lg font-semibold">
                                            x{item.quantity}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                        {/* order price details section  */}
                        <View className="border-t-2 border-gray-200 my-2">
                            {/* each price section  */}
                            <View className="flex-row w-full items-center justify-between">
                                <Text className="text-lg font-semibold text-gray-400">
                                    Price :
                                </Text>
                                <Text className="text-lg font-semibold">
                                    ₹{cartOriginalPrice}
                                </Text>
                            </View>

                            <View className="flex-row w-full items-center justify-between">
                                <Text className="text-lg font-semibold text-gray-400">
                                    Discount :
                                </Text>
                                <Text className="text-lg font-semibold text-green-600">
                                    ₹{cartOriginalPrice - cartDiscountedPrice}
                                </Text>
                            </View>

                            <View className="flex-row w-full items-center justify-between">
                                <Text className="text-lg font-semibold text-gray-400">
                                    Promo Code :
                                </Text>
                                <Text className="text-lg font-semibold">
                                    ₹{promoCodeDiscount}
                                </Text>
                            </View>

                            <View className="flex-row w-full items-center justify-between">
                                <Text className="text-lg font-semibold text-gray-400">
                                    Delivery Charge :
                                </Text>
                                <Text className="text-lg font-semibold">₹{deliverCharge}</Text>
                            </View>

                            {/* Total Price Section  */}
                            <View className="border-t-2 border-gray-200 w-full mt">
                                <View className="flex-row w-full items-center justify-between">
                                    <Text className="text-lg font-semibold">Total Price :</Text>
                                    <Text className="text-lg font-semibold text-green-600">
                                        ₹{cartDiscountedPrice}/-
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>



            {/* Payment Button  */}
            <TouchableOpacity onPress={handleOrderPlace} className="bg-primary py-4 my-2 w-[96%] self-center rounded-md flex-row items-center justify-center">

                <Text className="text-white ml-4  text-center text-xl font-semibold">
                    Place Order
                </Text>
            </TouchableOpacity>
        </>
    );
};

export default shopNow;