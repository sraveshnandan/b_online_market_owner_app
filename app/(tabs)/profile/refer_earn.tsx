import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { hp } from '@/constants'
import { EmptyAlert } from '@/components'

const Refer_earnScreen = () => {
  const { userData } = useSelector((state: RootState) => state.auth);

  return (
    <ScrollView className='flex-1 p-2'>


      <Text className='text-2xl font-semibold text-primary mb-4 '>
        Your referal list
      </Text>







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