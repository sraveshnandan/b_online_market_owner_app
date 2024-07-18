import { View, Text, TouchableOpacity, Share, Alert } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants';


const walletScreen = () => {
  const { userData } = useSelector((state: RootState) => state.auth);


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
    <View className='flex-1 '>


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
    </View>
  )
}

export default walletScreen