import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { router, useNavigation } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors, ScreenHeight, ScreenWidth } from "@/constants";
import { RootState } from "@/redux/store";
import { EmptyAlert } from "@/components";
import { clearCart, decreseQuantity, increementQuantity, removeProductToCart } from "@/redux/reducers/cart.reducers";

type Props = {};

const CartPage = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Global state
  const { cart } = useSelector((state: RootState) => state.cart);
  // local State
  const [totalCartPrice, settotalCartPrice] = useState<number>(0);

  // Setting header Data
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Shopping Cart",
      headerRight: () =>
        cart.length > 0 ? (
          <TouchableOpacity
            onPress={() => { dispatch(clearCart()) }}
            style={{ backgroundColor: Colors.CardBg }}
            className="flex-row items-center   px-2 py-1 rounded-full shadow-lg shadow-black/80"
          >
            <Ionicons name="trash-sharp" color={Colors.Red} size={20} />

          </TouchableOpacity>
        ) : null,
    });
  }, [cart.length]);

  // calculating total cart price
  useEffect(() => {
    const pp = cart.reduce((accumulator: any, currentItem: any) => {
      return accumulator + currentItem.totalPrice;
    }, 0);
    settotalCartPrice(pp);
  }, [totalCartPrice, cart]);

  return !cart.length ? (
    <View className="flex-1  items-center justify-center">
      <EmptyAlert title="No Products in your cart!" />
    </View>
  ) : (
    <View className="flex-1">
      <ScrollView>
        {cart &&
          cart.map((item: any, index: number) => (
            <View key={index} className="mt-4">
              <View className="bg-white w-[96%] self-center rounded-md mb-1 p-4  flex-row items-center">
                {/* Product Image  */}
                <View className=" bg-white shadow-lg rounded-md overflow-hidden shadow-gray-600 w-1/2">
                  <Image
                    style={{ width: "100%", height: 150, resizeMode: "cover" }}
                    source={{ uri: item.product.banners[0].url }}
                  />
                </View>

                {/* Product details  */}

                <View className="w-2/3 p-2  h-full">
                  <Text className="bg-gray-200 w-[50%] p-[2] text-center rounded-full font-semibold text-green-600 ">
                    Special Brand
                  </Text>
                  <Text className="text-xl font-semibold">
                    {item.product.name?.substring(0, 12)}...
                  </Text>

                  <View className="flex-row items-center">
                    <Text className="text-black font-bold">Quantity: </Text>
                    <Text className="text-black font-bold text-xl">
                      {item.quantity}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="text-black font-bold">Original Price: </Text>
                    <Text className="text-red-500 text-xl font-bold">
                      ₹{item.product.discountPrice}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-black font-bold">Price: </Text>
                    <Text className="text-green-500 text-xl font-bold">
                      ₹{item.product.discountPrice}
                    </Text>
                  </View>
                </View>

                {/* Remove from cart Button  */}
                <TouchableOpacity
                  onPress={() => dispatch(removeProductToCart({ ...item.product }))}
                  className="absolute top-4 right-4"
                >
                  <AntDesign
                    onPress={() =>
                      dispatch(removeProductToCart({ ...item.product }))
                    }
                    name="delete"
                    color={Colors.Red}
                    size={20}
                  />
                </TouchableOpacity>
              </View>


              {/* Cart CTA BUTTONS  */}
              <View className="bg-white w-[96%] self-center p-4 justify-between flex-row rounded-md items-center ">
                {/* Ptoduct Total price  */}
                <View>
                  <Text className="text-2xl font-bold text-green-600">
                    ₹{item.totalPrice} /-
                  </Text>
                </View>

                {/* Quantity add or remove button  */}
                <View className="flex-row items-center   px-2 py-1 rounded-md">
                  <TouchableOpacity
                    className="mr-4 bg-black p-1 rounded-md font-semibold"
                    onPress={() =>
                      dispatch(increementQuantity({ ...item.product }))
                    }
                  >
                    <Ionicons color={Colors.White} size={20} name="add-sharp" />
                  </TouchableOpacity>
                  <Text className="text-2xl font-semibold">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(decreseQuantity({ ...item.product }))
                    }
                    className="bg-gray-400 p-1 rounded-md  ml-4"
                  >
                    <Ionicons
                      size={20}
                      name={
                        item.quantity === 1 ? "trash-sharp" : "remove-sharp"
                      }
                      color={item.quantity === 1 ? Colors.Red : Colors.White}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>

      {/* Shop Now Button  */}
      {cart.length > 0 && (
        <View className="w-full px-2 py-2 items-center  bg-white flex-row justify-between absolute bottom-0 ">
          <View className="w-[50%]">
            <Text className="text-2xl text-green-600">₹{totalCartPrice}/-</Text>
          </View>

          <View className="w-[50%]">
            <TouchableOpacity
              onPress={() => {
                router.push(`/(screens)/ShopNow` as any);
              }}
              className="bg-black w-[100%] shadow-lg shadow-gray-400 py-2 rounded-full"
            >
              <Text className="text-white text-center text-2xl">Shop now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({});