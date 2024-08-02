import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { IOrder } from '@/types';
import Animated, { FadeInRight } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlldata } from '@/redux/reducers/main.reducers';
import { RootState } from '@/redux/store';
import { Colors, hp, wp } from '@/constants';

const UpdateOrderStatusScreen = () => {
    const dispatch = useDispatch()
    const params = useLocalSearchParams();
    const { authToken } = useSelector((state: RootState) => state.auth)


    const [order, setorder] = useState<IOrder>(JSON.parse(params.order as any));

    const status = ["Order Placed", "Processing", "Dispatched", "Out of delivery"];
    const [isDropDownOpen, setisDropDownOpen] = useState(false);
    const [loading, setloading] = useState(false)
    const [selectedStatus, setselectedStatus] = useState(order.status);



    // const handling order status update 

    const handleOrderStatusUpdate = async () => {
        setloading(true)
        try {
            const res = await fetch(`https://bom-api-1-0-1.onrender.com/api/v1/order/update?id=${order._id}&shop=${order.shop._id}&status=${selectedStatus}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: authToken
                }
            })
            const apiRes = await res.json();
            console.log(apiRes)
            if (apiRes.success) {
                console.log(apiRes);
                setorder(apiRes.order)
                dispatch(fetchAlldata() as any);
                return Toast.show({
                    type: "success",
                    text1: "Order status updated successfully."
                })
            } else {
                return Toast.show({
                    type: "error",
                    text1: `${apiRes.message}`
                })
            }




        } catch (error) {
            console.log("err while updating order status", error);
            return Toast.show({
                type: "error",
                text1: "Something went wrong.",
                text2: "Unable to process your request, please try again after sometime."
            })

        } finally {
            setloading(false)
        }

    }


    return (
        <View className='flex-1 py-2'>
            {
                loading && (
                    <View className='bg-black/20  mx-auto  z-50 absolute  w-full h-full  items-center justify-center'>

                        <View className='bg-white rounded-md shadow-lg shadow-black w-[80%] p-12'>

                            <ActivityIndicator size={"large"} color={Colors.Primary} />
                            <Text className='text-xl mt-4 font-semibold text-center'>Please wait...</Text>
                        </View>
                    </View>
                )
            }
            <Animated.View entering={FadeInRight.delay(250).springify()} className={`bg-white rounded-md shadow-lg shadow-black w-[96%] mx-auto p-2`}>

                <View className='flex-row items-center'>
                    <Text className='text-md font-semibold'>Order Id:</Text>
                    <Text className='text-md font-semibold opacity-60 ml-2'>{order._id}</Text>
                </View>


                <View className='flex-row my-2 items-center'>
                    <Text className='text-md font-semibold'>Created At:</Text>
                    <Text className='text-md font-semibold opacity-60 ml-2'>{new Date(order.createdAt).toDateString()}</Text>
                </View>



                <View className='flex-row shadow-md shadow-black items-center bg-gray-200 justify-between rounded-lg p-2'>
                    <Text className='text-primary text-xl font-semibold'>Current Status:</Text>
                    <Text className='text-green-500 text-xl font-semibold'>{order.status}</Text>
                </View>




                <View className='my-4 w-full p-2'>
                    <Text className='text-xl font-semibold'>Change order status</Text>


                    <View className='bg-gray-200 mt-2 flex-row items-center justify-between w-full rounded-md p-2 '>
                        {/* data section  */}
                        <View className='flex-grow justify-start  p-2'>
                            {
                                status.map((item, index) => (
                                    <TouchableOpacity onPress={() => setselectedStatus(item)} key={index} className={`my-2 ${selectedStatus === item && "bg-primary py-3 rounded-md"}`}>
                                        <Text className={`text-center ${selectedStatus === item && "text-white"} text-xl font-semibold`}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>
                    </View>


                    <TouchableOpacity onPress={handleOrderStatusUpdate} className={`w-full ${loading && "bg-gray-400"} bg-primary py-3 my-4 rounded-md shadow-lg shadow-black`}>
                        <Text className={`text-white text-xl text-center `}>{loading ? "Updating..." : "Update status"}</Text>
                    </TouchableOpacity>

                </View>

            </Animated.View>
        </View>
    )
}

export default UpdateOrderStatusScreen