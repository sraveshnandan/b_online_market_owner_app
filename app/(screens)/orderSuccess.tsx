import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { IOrder } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const OrderSuccessScreen = () => {
  const params = useLocalSearchParams();

  const [order, setorder] = useState<IOrder>(JSON.parse(params.order as any))

  return (
    <View className='flex-1 relative'>
      <ScrollView className='flex-1 py-2 '>


        <Animated.View entering={FadeInUp.delay(500).springify()} className='w-[96%] min-h-[256px]  mx-auto bg-green-500 rounded-md p-2 items-center justify-center'>

          <Ionicons name='checkmark-circle-outline' color={"#fff"} size={80} />

          <Text className='text-white font-semibold text-lg my-4'>Your order placed successfully.</Text>

        </Animated.View>



        {/* order details  */}
        <Animated.View className={`bg-white rounded-md shadow-lg shadow-black mx-auto w-[95%] p-2 my-4`}>




          {/* order id  */}
          <View className='flex-row items-center mt-2 justify-between '>
            <Text className='text-md font-semibold text-black/40'>Order Id:</Text>
            <Text className='text-md font-bold text-primary ml-2'>{order._id}</Text>
          </View>

          <View className='flex-row items-center mt-2 justify-between '>
            <Text className='text-md font-semibold text-black/40'>Order creation Date:</Text>
            <Text className='text-md font-bold text-primary ml-2'>{new Date(order.createdAt).toDateString()}</Text>
          </View>

          <View className='flex-row items-center mt-2 justify-between '>
            <Text className='text-md font-semibold text-black/40'>Order Status:</Text>
            <Text className='text-md font-bold text-primary ml-2'>{order.status}</Text>
          </View>

          <View className='flex-row items-center mt-2 justify-between '>
            <Text className='text-md font-semibold text-black/40'>Payment Mode:</Text>
            <Text className='text-md font-bold text-primary ml-2'>{order.payment_mode}</Text>
          </View>


          <View className='flex-row items-center mt-2 justify-between '>
            <Text className='text-md font-semibold text-black/40'>Order total value:</Text>
            <Text className='text-md font-bold text-green-500 ml-2'> ₹{order.totalPrice}</Text>
          </View>
        </Animated.View>

      </ScrollView>

      {/* go to profile button  */}

      <TouchableOpacity onPress={() => router.replace("/(tabs)/profile/")} className='w-[96%] absolute bottom-4 left-2 mx-auto bg-primary py-3 rounded-md'>
        <Text className='text-white text-center font-semibold text-lg'>Go to profile page</Text>
      </TouchableOpacity>

    </View>
  )
}

export default OrderSuccessScreen