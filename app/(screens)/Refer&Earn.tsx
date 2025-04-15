import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Share, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Colors, hp } from '@/constants'
import { EmptyAlert } from '@/components'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { fetchUserProfile } from '@/redux/reducers/auth.reducer'

const Refer_earnScreen = () => {
    const dispatch = useDispatch()
    const { userData, authToken } = useSelector((state: RootState) => state.auth);
    const [refreshing, setrefreshing] = useState(false);

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


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className='flex-1 p-2'>
            <View className='my-4'>
                <Text className='text-2xl text-primary font-semibold text-center'>Refer & Earn</Text>
                <Text className='text-lg text-black font-semibold text-center'>Refer & Earn up to 20 % cashback per successfull refer. </Text>
                <TouchableOpacity onPress={handlShare} className='bg-gray-200 rounded-md w-[50%] mx-auto flex-row items-center  my-4 p-2'>
                    <Text className='text-2xl font-semibold text-center mr-2'>{userData.referCode}</Text>
                    <Ionicons name='share-social-sharp' size={28} color={Colors.Primary} />
                </TouchableOpacity>
            </View>


            <View className='bg-white rounded-md p-2 w-[98%] mx-auto'>
                <Text className='my-2 text-md font-semibold'>Total refer count: {userData.referCount.length}</Text>
                {
                    userData.referCount.length > 0 ? (<View>

                        {
                            userData.referCount.map((item, index) => (
                                <View key={index} className='bg-gray-200 flex-row my-2 rounded-md p-2 justify-start items-center'>

                                    {/* user profile image  */}

                                    <Image source={{ uri: item.avatar.url }} className='w-16 h-16 rounded-full object-cover' />

                                    {/* user name  */}

                                    <Text className='ml-4 text-xl font-semibold'>{item.full_name}</Text>



                                </View>
                            ))
                        }

                    </View>) : (<View className='items-center justify-center ' style={{ height: hp(50) }}>
                        <EmptyAlert title='No referals yet.' />
                    </View>)
                }
            </View>

        </ScrollView>
    )
}

export default Refer_earnScreen