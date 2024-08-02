import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'
import { router } from 'expo-router'

const startBusinessScreen = () => {
    return (
        <View className='flex-1 items-center justify-center'>
            <View className='mx-auto w-[86%] bg-white rounded-md shadow-lg shadow-black/50 p-4 items-center justify-center'>
                <Ionicons name='storefront-outline' size={55} color={Colors.Primary} />
                <Text className='text-xl font-semibold mt-2 '>Make your Online Store</Text>
                <Text className='text-[11px] max-w-[80%] text-center mt-2 opacity-60'>You are one step ahead to make your shop online, do it now and start accepting orders online.</Text>
                <TouchableOpacity onPress={() => router.push(`/(auth)/createShop`)} className='bg-primary rounded-md my-4 w-[80%] mx-auto py-3'><Text className='text-center font-semibold text-white'>Register your shop</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default startBusinessScreen