import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { IOrder, IProduct } from '@/types'
import { hp } from '@/constants'
import { EmptyAlert } from '@/components'

const OrdersScreen = () => {

  const { orders } = useSelector((state: RootState) => state.main);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [userOrders, setuserOrders] = useState<IOrder[]>(orders.filter(o => o.user._id === userData._id));

  return (
    <ScrollView className='flex-1'>

      {userData.orders.length ? (
        <>

          <View>
            {
              userData.orders.map((item, index) => (
                <View key={index} className='w-[95%] mx-auto bg-white rounded-md p-2 my-2'>
                  {/* order details  */}

                  <View className='bg-gray-200 p-2 rounded-md'>

                    <View className='flex-row items-center justify-between '>
                      <Text className='text-md font-semibold text-primary'>Order Id:</Text>
                      <Text className='text-md font-semibold text-black/80'>{item._id}</Text>
                    </View>

                    <View className='flex-row items-center justify-between  '>
                      <Text className='text-md font-semibold text-primary'>Order status:</Text>
                      <Text className='text-md font-semibold text-black/80'>{item.status}</Text>
                    </View>

                    <View className='flex-row items-center justify-between  '>
                      <Text className='text-md font-semibold text-primary'>Payment mode:</Text>
                      <Text className='text-md font-semibold text-black/80'>{item.payment_mode}</Text>
                    </View>

                    <View className='flex-row items-center justify-between  '>
                      <Text className='text-md font-semibold text-primary'>Total price:</Text>
                      <Text className='text-lg font-semibold text-green-600'>₹{item.totalPrice}</Text>
                    </View>
                  </View>

                  <View className='bg-gray-200 p-2 rounded-md my-2'>

                    {
                      item.address && (
                        <>

                          <View className='flex-row items-center justify-between '>
                            <Text className='text-md font-semibold text-primary'>Delivery Address:</Text>
                            <View className='bg-white flex-grow p-1 ml-2 rounded-md'>
                              <Text className='text-gray-400 text-sm font-semibold'>{item.address.appartment_building_no || "Not provided"}</Text>
                              <Text className='text-gray-400 text-sm font-semibold'>{item.address.city || "Not provided"}</Text>
                              <Text className='text-gray-400 text-sm font-semibold'>+91 {item.address.contact_no || "Not provided"}</Text>
                              <Text className='text-gray-400 text-sm font-semibold'>{item.address.landmark || "Not provided"}</Text>
                              <Text className='text-gray-400 text-sm font-semibold'>{item.address.pin_code || "Not provided"}</Text>
                              <Text className='text-gray-400 text-sm font-semibold'>{item.address.state || "Not provided"}</Text>
                            </View>
                          </View>
                        </>
                      )
                    }



                  </View>


                </View>
              ))
            }
          </View>


        </>
      ) : (

        <View className='items-center justify-center' style={{ height: hp(50) }}>
          <EmptyAlert title='No Orders yet!' />
        </View>
      )}


    </ScrollView>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})