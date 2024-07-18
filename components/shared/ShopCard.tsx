import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IShop } from '@/types'
import { hp, wp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { addShopToWishlistShop, removeShopToWishlistShop } from '@/redux/reducers/wislistShop.reducers'
import Toast from 'react-native-toast-message'

type Props = {
    shop: IShop,
    setModelState?: Dispatch<SetStateAction<boolean>>
}

const ShopCard = ({ shop, setModelState }: Props) => {
    const dispatch = useDispatch()
    const [shopLiked, setshopLiked] = useState<boolean>(false)
    const { wishlistShop } = useSelector((state: RootState) => state.wishlistShop);
    const { authState } = useSelector((state: RootState) => state.auth);

    const handleBtnPress = () => {
        if (setModelState) {
            setModelState(false);
            return router.push(`/(tabs)/home/shop_details?shopId=${shop._id}&name=${shop.name}`)

        }
        return router.push(`/(tabs)/home/shop_details?shopId=${shop._id}&name=${shop.name}`)
    }



    useEffect(() => {
        const isExists = wishlistShop.findIndex(s => s._id === shop._id)
        if (isExists !== -1) {
            setshopLiked(true)
        } else {
            setshopLiked(false)
        }
    }, [wishlistShop.length])

    return (
        <View className='bg-white relative p-2 rounded-md items-center mb-4 h-fit '>

            {/* shop wishlist icon  */}

            <View className='absolute right-6 top-4 z-30 bg-slate-50 rounded-full p-1'>
                <Ionicons onPress={() => {
                    if (!authState) {
                        return Toast.show({
                            type: "info",
                            text1: "Unauthorised",
                            text2: "Please login to perform this operation."
                        })

                    }
                    if (shopLiked) {
                        dispatch(removeShopToWishlistShop({ ...shop }))
                        return Toast.show({
                            type: "info",
                            text1: "Shop removed from your wihlist."
                        })
                    } else {
                        dispatch(addShopToWishlistShop({ ...shop }));
                        return Toast.show({
                            type: "success",
                            text1: "Shop added from your wihlist."
                        })
                    }
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