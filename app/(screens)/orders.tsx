import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { Colors, hp } from '@/constants'
import { EmptyAlert } from '@/components'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { fetchAlldata } from '@/redux/reducers/main.reducers'



// pre defined order status 



const orders = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state: RootState) => state.main);
    const { userShop } = useSelector((state: RootState) => state.auth);
    const [toggleIndex, settoggleIndex] = useState(0);
    const [mainShopOrders, setmainShopOrders] = useState(orders.filter(o => o.shop._id.toString() === userShop._id.toString()))
    const [shopOrders, setshopOrders] = useState(orders.filter(o => o.shop._id.toString() === userShop._id.toString()));
    const status = ["Order Placed", "Processing", "Dispatched", "out of delivery"]
    const [refreshing, setrefreshing] = useState(false);




    useEffect(() => {
        const prevData = mainShopOrders;
        const order_status = status[toggleIndex];
        setshopOrders(prevData.filter(o => o.status.toLowerCase() === order_status.toLowerCase()))
    }, [toggleIndex]);



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


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className='flex-1   py-2' showsHorizontalScrollIndicator={false}>
            {/* status toggler  */}
            <View className='w-[96%] flex-row shadow-lg overflow-x-scroll shadow-black items-center justify-between p-1 mx-auto bg-white rounded-xl'>

                {
                    status.map((item, index) => (
                        <TouchableOpacity onPress={() => settoggleIndex(index)} className={`p-2 rounded-xl ${toggleIndex === index && "bg-primary"}`} key={index}>
                            <Text className={`text-[12px] font-medium ${toggleIndex === index && "text-white"}`}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))
                }

            </View>

            <View className='w-full mt-4'>
                {shopOrders.length ? (
                    shopOrders.map((item, index) => (
                        <Animated.View key={index} entering={FadeInDown.delay(100 * index).springify()} className='bg-white shadow-md shadow-black/60 rounded-md p-2 w-[95%] mx-auto my-3'>
                            <View className='flex-row items-center justify-between'>
                                {/* status  */}
                                <View className='bg-green-600 p-2 flex-row  w-[50%] rounded-l-lg  shadow-lg shadow-black items-center justify-center '>
                                    <Ionicons name='sparkles' size={20} color={"#fff"} />
                                    <Text className='text-white ml-1 font-semibold text-md'>{item.status}</Text>
                                </View>

                                <View className='bg-yellow-500 p-2 flex-row  w-[50%] rounded-r-lg  shadow-lg shadow-black items-center justify-center '>
                                    <Ionicons name='calendar' size={20} color={"#fff"} />
                                    <Text className='text-white ml-1 font-semibold text-md'>{new Date(item.createdAt).toDateString()}</Text>
                                </View>
                            </View>

                            <View className='bg-gray-200 rounded-md p-2 my-4'>

                                <View className='flex-row  rounded-full items-center justify-between '>
                                    <Text className='text-sm font-bold'>Order Id:</Text>
                                    <Text className='text-primary/80 ml-1 font-semibold text-lg'>{item._id}</Text>
                                </View>

                                <View className='flex-row  rounded-full items-center justify-between '>
                                    <Text className='text-sm font-bold'>Payment Mode:</Text>
                                    <Text className='text-primary/80 ml-1 font-semibold text-lg'>{item.payment_mode}</Text>
                                </View>

                                <View className='flex-row  rounded-full items-center justify-between '>
                                    <Text className='text-sm font-bold'>Total Price:</Text>
                                    <Text className='text-green-600 ml-1 font-semibold text-xl'>₹{item.totalPrice}</Text>
                                </View>
                            </View>


                            <View className=' flex-row items-center justify-between rounded-md p-2 mt-2'>
                                <TouchableOpacity onPress={() => router.push(`/(screens)/OrderInfo?order=${JSON.stringify(item)}` as any)} className='flex-row w-[48%] justify-center border-r-2 items-center '>
                                    <Ionicons name='information-circle' color={"green"} size={25} />
                                    <Text className='ml-1 text-md font-semibold'>Info</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => router.push(`/(screens)/UpdateOrderStatus?order=${JSON.stringify(item)}` as any)} className='flex-row w-[48%]  justify-center items-center '>
                                    <Ionicons name='stats-chart-sharp' color={"green"} size={25} />
                                    <Text className='ml-1 text-md font-semibold'>Update</Text>
                                </TouchableOpacity>

                            </View>
                        </Animated.View>
                    ))) : (
                    <View style={{ height: hp(40), marginTop: 25 }}>
                        <EmptyAlert title='No Orders yet.' />
                    </View>
                )
                }
            </View>


        </ScrollView>
    )
}

export default orders