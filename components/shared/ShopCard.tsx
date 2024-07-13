import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IShop } from '@/types'
import { hp, wp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

type Props = {
    shop: IShop
}

const ShopCard = ({ shop }: Props) => {
    const [shopLiked, setshopLiked] = useState<boolean>(false)

    const handleBtnPress = () => {
        return router.push(`/(tabs)/home/shop_details?shopId=${shop._id}&name=${shop.name}`)
    }


    return (
        <View className='bg-white relative p-2 rounded-md items-center mb-4 h-fit '>

            {/* shop wishlist icon  */}

            <View className='absolute right-6 top-4 z-30 bg-slate-50 rounded-full p-1'>
                <Ionicons onPress={() => {
                    setshopLiked(prev => !prev)
                }} color={"red"} name={shopLiked ? "heart-sharp" : "heart-outline"} size={28} />
            </View>


            {/* shop image  */}
            <Image source={{ uri: shop.banners[0].url }} width={wp(85)} height={hp(25)} className='rounded-md' />

            {/* shop details  */}


            <View className='items-start w-full my-2 p-2 rounded-md bg-gray-200'>
                {/* shop name  */}
                <Text className='text-xl font-semibold'>{shop.name.substring(0, 40)}</Text>
                <Text className='text-sm font-semibold'>{shop.address.substring(0, 40)}</Text>

                {/* view Products button  */}

                <TouchableOpacity onPress={handleBtnPress} className='bg-primary w-full my-2 py-2 rounded-md'>
                    <Text className='text-white text-center text-lg font-semibold'>View Products</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShopCard