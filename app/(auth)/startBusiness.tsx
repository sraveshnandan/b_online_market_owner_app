import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'
import { router, useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { checkUserSubscription } from '@/utils'
import Toast from 'react-native-toast-message'
import { logout } from '@/redux/reducers/auth.reducer'

const startBusinessScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()


    const { authToken, userData } = useSelector((state: RootState) => state.auth)

    const [paidUser, setpaidUser] = useState(false);
    const [loading, setloading] = useState(true)


    const checkSubStatus = async () => {
        try {
            const res = await checkUserSubscription(authToken);

            if (res.success) {
                setpaidUser(true)
                return router.replace(`/(auth)/createShop`)
            }
            return setpaidUser(false)
        } catch (error) {
            return Toast.show({
                type: "error",
                text1: "Unable to fetch your subscription details."
            })
        } finally {
            setloading(false)
        }
    }



    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    dispatch(logout());
                    return router.replace(`/(auth)/`)
                }}>
                    <Ionicons name="log-out-sharp" size={22} color={"red"} />
                </TouchableOpacity>
            )
        })

    }, [])

    useEffect(() => {
        checkSubStatus()
    }, [])
    return (
        <View className='flex-1 items-center justify-center'>
            <View className='mx-auto w-[86%] bg-white rounded-md shadow-lg shadow-black/50 p-4 items-center justify-center'>
                <Ionicons name='storefront-outline' size={55} color={Colors.Primary} />
                <Text className='text-xl font-semibold mt-2 '>Make your Online Store</Text>
                <Text className='text-[11px] max-w-[80%] text-center mt-2 opacity-60'>You are one step ahead to make your shop online, do it now and start accepting orders online.</Text>
                <TouchableOpacity onPress={() => {
                    if (loading) {
                        return Alert.alert("Fetching Data", "Please wait for a while.")
                    }
                    if (paidUser) {
                        return router.push(`/(auth)/createShop`)
                    } else {
                        router.push(`/(auth)/UpgradeScreen`)
                    }
                }} className='bg-primary rounded-md my-4 w-[80%] mx-auto py-3'><Text className='text-center font-semibold text-white'>Register your shop</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default startBusinessScreen