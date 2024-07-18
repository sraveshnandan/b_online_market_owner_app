import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'

const SignInAlert = () => {
    return (
        <View className='flex-1 items-center justify-center'>
            <Animated.View className={`bg-white shadow-lg shadow-black w-[96%] items-center  rounded-md p-2`} entering={FadeInDown.delay(200).springify()}>
                <MaterialCommunityIcons name='server-network-off' size={65} color={"red"} />

                <Text className='text-3xl font-semibold mt-8 text-red-500'>You are not authenticated.</Text>
                <Text className='text-sm text-center font-semibold  text-gray-500'>please login to access our full resourses. Just login with your phone number or if you haven't created your account  then just create one.</Text>


                {/* btn container  */}
                <View className='flex-row items-center my-4 w-full'>
                    <TouchableOpacity onPress={() => router.push(`/(tabs)/home/`)} className='bg-gray-400  w-[48%] py-2 rounded-md shadow-md shadow-black'>
                        <Text className='text-lg font-semibold text-white text-center'>Cancle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push(`/(auth)/`)} className='bg-primary  w-[48%] py-2 rounded-md ml-2 shadow-md shadow-black'>
                        <Text className='text-lg font-semibold text-white text-center'>Continue</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

export default SignInAlert