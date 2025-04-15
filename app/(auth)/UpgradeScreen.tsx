import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { PaymentButton } from '@/components'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const benifits = [
    "Unlimited product creations",
    "easily manageable store",
    "Aceess of all app features",
    "full access of all orders",
    "free T-Shirt and LOGO"
]

const UpgradeScreen = () => {

    const { userData } = useSelector((state: RootState) => state.auth);
    const [loading, setloading] = useState(false)



    return (
        <View className='flex-1 items-center justify-center'>

            <Pressable onPress={() => router.replace(`/(auth)/createShop`)} className='opacity-10 absolute top-2 right-4'>
                <Text>skip</Text>
            </Pressable>
            {/* payment card  */}
            <View className=' bg-white rounded-md shadow-lg p-3 my-4 w-[95%] mx-auto shadow-black/60'>
                <View className='p-4 mb-2 bg-gray-200 rounded-md  '>
                    <Text className='text-primary font-semibold text-lg  bg-white self-start px-4 py-1 shadow-md shadow-black/40 rounded-full'>Goald Membership</Text>

                    <View className='flex-row px-4 space-x-2 mb-4 mt-8 items-center'>
                        <Text className=' text-6xl font-medium text-green-600'>₹499</Text>


                        <Text className=' text-red-500 font-semibold text-2xl line-through'>₹999</Text>
                    </View>

                    <Text className='text-neutral-500 ml-4 font-semibold text-md'>Best for shop owners.</Text>
                </View>


                <View className='my-4'>
                    {benifits.map((item, index) => (
                        <View key={index}
                            className={`flex-row my-2 ${index === benifits.length - 1 && "bg-green-500 rounded-full px-2 py-1"} items-center space-x-2`}
                        >
                            <Ionicons name='checkmark-circle-outline' color={"green"} size={22} />

                            <Text className={`text-lg ${index === benifits.length - 1 && "text-white/90"}  font-semibold `}>{item}</Text>
                        </View>
                    ))}
                </View>
                <PaymentButton user={userData} loading={loading} setLoading={setloading} />
            </View>
        </View>
    )
}

export default UpgradeScreen