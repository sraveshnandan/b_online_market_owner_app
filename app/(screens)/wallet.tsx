import { View, Text, TouchableOpacity, Share, Alert, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants';
import { fetchAlldata } from '@/redux/reducers/main.reducers'
import Toast from 'react-native-toast-message'
import { fetchUserProfile } from '@/redux/reducers/auth.reducer'


const walletScreen = () => {
    const dispatch = useDispatch()
    const { userData, authToken } = useSelector((state: RootState) => state.auth);
    const [refreshing, setrefreshing] = useState(false);


    // handling refresh controll 

    const onRefresh = useCallback(() => {
        setrefreshing(true);
        try {
            dispatch(fetchUserProfile({ token: authToken }) as any);
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

    // handling share 
    const handlShare = async () => {
        try {
            const result = await Share.share({
                message: `Hey sign up with my refer code ${userData.referCode} in B Online market app and get amazing rewards. Download the app now. App Link: https://play.google.com/store/apps/details?id=com.sravesh.bom&pli=1`,

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className='flex-1 '>


            <View className='bg-white rounded-md mt-2 items-center justify-center w-[96%] min-h-[256px] p-2 mx-auto'>
                <Text className='text-md font-semibold mb-4'>
                    Your current balence
                </Text>
                <Text className='text-6xl text-green-500 font-semibold'>₹{userData.wallet.currentBallence}</Text>
                <Text className='text-lg text-primary font-semibold mt-4 '>Minimum withdraw amount ₹ 500 /- </Text>
            </View>


            <View className='my-4'>
                <Text className='text-2xl text-primary font-semibold text-center'>Refer & Earn</Text>
                <Text className='text-lg text-black font-semibold text-center'>Refer & Earn up to ₹ 5 per successfull referal. </Text>
                <TouchableOpacity onPress={handlShare} className='bg-gray-200 rounded-md w-[50%] mx-auto flex-row items-center  my-2 p-2'>
                    <Text className='text-2xl font-semibold text-center mr-2'>{userData.referCode}</Text>
                    <Ionicons name='share-social-sharp' size={28} color={Colors.Primary} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default walletScreen