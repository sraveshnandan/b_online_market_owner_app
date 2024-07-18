import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { APP_VERSION, Colors, ProfileMenu } from '@/constants'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { fetchUserProfile, logout } from '@/redux/reducers/auth.reducer'
import { SignInAlert } from '@/components';
import * as Linking from "expo-linking"

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const { userData, authToken, isLoading, authState } = useSelector((state: RootState) => state.auth);
    const [refreshing, setrefreshing] = useState(false);



    // refresh handler 

    const onRefresh = useCallback(() => {
        setrefreshing(true);
        dispatch(fetchUserProfile({ token: authToken }) as any)
        if (!isLoading) {
            return setrefreshing(false)
        }
    }, [])

    // handling log out fn 
    const logoutHandler = () => {
        console.log("log out clicked.");
        dispatch(logout({}));
        return router.replace(`/(auth)/`)

    }
    return !authState ? (
        <SignInAlert />
    ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className='flex-1' showsVerticalScrollIndicator={false}>
            {/* user profile details  */}

            <View className='bg-white items-center justify-center w-[95%] rounded-md p-2 mx-auto mt-2 mb-4'>


                {/* edit profile button  */}

                <TouchableOpacity onPress={() => router.push(`/(tabs)/profile/updateProfile`)} className='absolute top-2 right-2 bg-gray-200 p-2 rounded-full'>
                    <MaterialCommunityIcons name='pen' size={20} color={Colors.Primary} />
                </TouchableOpacity>
                {/* user image  */}
                <View className='border-4 rounded-full p-1 border-primary  items-center justify-center ring-primary/50'>
                    <Image className='rounded-full w-[120px] h-[120px] object-cover' source={{ uri: userData?.avatar?.url }} />
                </View>

                {/* user name & other details  */}
                <Text className='text-3xl font-semibold mt-4'>{userData.full_name}</Text>


                <View className='flex-row items-center my-2 '>
                    <Ionicons name='call-sharp' size={20} color={Colors.Primary} />

                    <Text className='text-sm font-semibold ml-2'> +91 {userData.phone_no}</Text>
                </View>
            </View>


            {/* profile action button  */}


            {
                ProfileMenu.map((item, index) => (
                    <TouchableOpacity onPress={() => router.push(item.link)} className='bg-white rounded-md w-[96%] p-2 m-2 mx-auto  flex-row items-center justify-center' key={index}>

                        {/* icon  */
                        }
                        <MaterialCommunityIcons color={Colors.Primary} name={item.icon as any} size={32} />

                        <View className='flex-grow ml-2  h-full flex-row items-center justify-between p-2'>
                            <Text className='text-xl font-semibold'>{item.name}</Text>
                            <Ionicons name='chevron-forward-sharp' size={22} />
                        </View>
                    </TouchableOpacity>
                ))
            }

            <TouchableOpacity onPress={logoutHandler} className='flex-row pl-2 items-center '>
                <Ionicons name='log-out-sharp' color={"red"} size={26} />
                <Text className='text-lg  text-red-600 font-semibold'>Log out</Text>
            </TouchableOpacity>
            <Text className='text-xl font-semibold text-gray-500 text-center my-4'>App Version: {APP_VERSION}</Text>

            {/* copyright section  */}
            <TouchableOpacity onPress={() => Linking.openURL("https://xecurecode.tech")} className='flex-row items-center justify-center w-full '>
                <Text className='text-lg  text-gray-500 font-semibold'>Powerd by</Text>
                <Text className='text-lg  ml-2 text-primary font-semibold'>XecureCode</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ProfileScreen