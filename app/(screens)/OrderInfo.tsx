import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { IOrder } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { hp } from '@/constants';
import { fetchAlldata } from '@/redux/reducers/main.reducers';
import Toast from 'react-native-toast-message';

const OrderInfoScreen = () => {
    const dispatch = useDispatch()
    const params = useLocalSearchParams();
    const [order, setorder] = useState<IOrder>(JSON.parse(params.order as any));
    const [orderProducts, setorderProducts] = useState<any[]>([])
    const { products } = useSelector((state: RootState) => state.main);

    const [refreshing, setrefreshing] = useState(false);

    // for extracting details by product id 
    const getProductDetails = (id: string) => {
        return products.find(p => p._id.toString() === id);
    }


    // setting all ordered products 
    const setAllOrderProducts = () => {
        let products: any[] = [];

        order.products.map(item => {
            const data = getProductDetails(String(item.product));
            products.push({ ...data, quantity: item.quantity })
        })
        setorderProducts(products)
    }


    // handling refresh controll 

    const onRefresh = useCallback(() => {
        setrefreshing(true);
        try {
            dispatch(fetchAlldata() as any);
            return Toast.show({
                type: "success",
                text1: "Data refreshed successfully.",
                text2: "You data is up to dated now."
            })
        } catch (error) {
            return Toast.show({
                type: "error",
                text1: "Something went wrong.",
                text2: "Unable to refresh the data, please check your internet connection."
            })

        } finally {
            setrefreshing(false)
        }
    }, [])


    useEffect(() => {
        setAllOrderProducts()
    }, [])



    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className='flex-1 py-2'>


            <View className='bg-white rounded-md shadow-md shadow-black w-[96%] mx-auto p-2'>

                <View className='flex-row items-center justify-between w-full '>
                    <Text className='text-lg text-primary/80 font-semibold '>Order Id:</Text>
                    <Text className='text-md font-semibold '>{order._id}</Text>
                </View>

                <View className='flex-row items-center justify-between w-full '>
                    <Text className='text-lg text-primary/80 font-semibold '>Payment Mode:</Text>
                    <Text className='text-md font-semibold '>{order.payment_mode}</Text>
                </View>

                <View className='flex-row items-center justify-between w-full '>
                    <Text className='text-lg text-primary/80 font-semibold '>Order Status:</Text>
                    <Text className='text-md font-semibold '>{order.status}</Text>
                </View>

                <View className='flex-row items-center justify-between w-full '>
                    <Text className='text-lg text-primary/80 font-semibold '>Order Value:</Text>
                    <Text className='text-lg text-green-600 font-semibold '>₹ {order.totalPrice}</Text>
                </View>


                <Text className='text-center text-primary text-lg font-semibold border-b-2 border-b-gray-200 mb-2'>User Info:</Text>

                <View className='bg-gray-200 rounded-md shadow-md shadow-primary/60 p-2 items-center justify-center'>

                    <Image source={{ uri: order.user.avatar.url }} width={100} height={100} className='rounded-full  object-cover' />

                    <View className='w-full  bg-white items-center justify-center rounded-md p-2 my-2'>
                        <Text className='text-3xl  font-medium'>{order.user.full_name}</Text>
                        <Text className='text-sm  font-medium'>{order.user.email}</Text>
                        <Text className='text-sm text-primary  font-medium'>+91 {order.user.phone_no}</Text>
                    </View>
                </View>

                <Text className='text-center text-primary text-lg font-semibold border-b-2 border-b-gray-200 my-4'>Address Info:</Text>


                <View className='flex-col'>

                    <View className='flex-row bg-gray-100 my-2 p-2 rounded-md items-center justify-between px-4  w-full'>
                        <Text className='text-sm font-semibold text-primary'>Appartment Building No:</Text>
                        <Text className='text-lg font-semibold '>{order.address.appartment_building_no || "Not provided"}</Text>
                    </View>

                    <View className='flex-row bg-gray-100 my-2 p-2 rounded-md items-center justify-between px-4  w-full'>
                        <Text className='text-sm font-semibold text-primary'>City:</Text>
                        <Text className='text-lg font-semibold '>{order.address.city || "Not provided"}</Text>
                    </View>

                    <View className='flex-row bg-gray-100 my-2 p-2 rounded-md items-center justify-between px-4  w-full'>
                        <Text className='text-sm font-semibold text-primary'>LandMark:</Text>
                        <Text className='text-lg font-semibold '>{order.address.landmark || "Not provided"}</Text>
                    </View>

                    <View className='flex-row bg-gray-100 my-2 p-2 rounded-md items-center justify-between px-4  w-full'>
                        <Text className='text-sm font-semibold text-primary'>State:</Text>
                        <Text className='text-lg font-semibold '>{order.address.state || "Not provided"}</Text>
                    </View>

                    <View className='flex-row bg-gray-100 my-2 p-2 rounded-md items-center justify-between px-4  w-full'>
                        <Text className='text-sm font-semibold text-primary'>Pin Code:</Text>
                        <Text className='text-lg font-semibold '>{order.address.pin_code || "Not provided"}</Text>
                    </View>

                    <View className='flex-row bg-gray-100 my-2 p-2 rounded-md items-center justify-between px-4  w-full'>
                        <Text className='text-sm font-semibold text-primary'>Contact No:</Text>
                        <Text className='text-xl font-semibold '> +91 {order.address.contact_no || "Not provided"}</Text>
                    </View>

                </View>


                <Text className='text-center text-primary text-lg font-semibold border-b-2 border-b-gray-200 my-4'>Product Info:</Text>
                <View className='my-4'>
                    {
                        orderProducts.map((item, index) => (
                            <View style={{ height: hp(45) }} key={index} className='bg-gray-100 rounded-md relative p-4  items-center'>
                                <Text className='absolute top-2 right-2 font-bold bg-green-500 z-50 rounded-md shadow-lg shadow-black p-2 text-white'>Quantity: {item.quantity}</Text>
                                <Image source={{ uri: item.banners[0].url }} width={100} height={100} className=' w-full h-[60%] rounded-md' />

                                <View className='w-full'>
                                    <Text className='text-3xl font-semibold mt-2 text-start'>{item.name}</Text>


                                    <View className='flex-row items-center'>
                                        <Text className='text-4xl font-semibold mt-2 text-green-500'>₹{item.discountPrice}</Text>
                                        <Text className='text-xl font-semibold mt-2 text-red-500 ml-4'>₹{item.originalPrice}</Text>
                                    </View>

                                    <Text className='mt-4 text-sm font-medium opacity-70'>{item.description}</Text>

                                </View>
                            </View>
                        ))
                    }
                </View>

            </View>
        </ScrollView>
    )
}

export default OrderInfoScreen