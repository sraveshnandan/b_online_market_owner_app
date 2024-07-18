import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { EmptyAlert, ProductCard, SignInAlert } from '@/components'
import ShopCard from '@/components/shared/ShopCard'

const WishlistScrren = () => {

    const { wishlist } = useSelector((state: RootState) => state.wishlist);
    const { wishlistShop } = useSelector((state: RootState) => state.wishlistShop);
    const { authState } = useSelector((state: RootState) => state.auth);
    const [tabIndex, settabIndex] = useState<number>(0)

    return !authState ? (
        <SignInAlert />
    ) : (
        <ScrollView className='flex-1 py-2'>
            {/* wishlist toggler  */}
            <View className='w-[96%] bg-white p-2 flex-row rounded-md mx-auto justify-between items-center'>
                <TouchableOpacity onPress={() => settabIndex(0)} className={`py-2 bg-gray-200 px-3 rounded-md ml-4 w-[45%] ${tabIndex === 0 && "bg-primary"}`}>
                    <Text className={`text-black text-center font-semibold text-xl ${tabIndex === 0 && "text-white"}`}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => settabIndex(1)} className={`py-2 bg-gray-200 px-3 rounded-md  w-[45%] ${tabIndex === 1 && "bg-primary"}`}>
                    <Text className={`text-black text-center font-semibold text-xl ${tabIndex === 1 && "text-white"}`}>shops</Text>
                </TouchableOpacity>
            </View>




            {/* list items  */}


            {
                tabIndex === 0 ? wishlist.length > 0 ? (
                    <View className='flex-row flex-wrap my-4'>
                        {
                            wishlist.map((item, index) => <ProductCard pr={item} key={index} />)
                        }
                    </View>
                ) : (
                    <View className='mt-24' >
                        <EmptyAlert title='No data found.' />
                    </View>
                ) : (
                    <>
                        {
                            wishlistShop.length > 0 ? (<>
                                {
                                    wishlistShop.map((item, index) => (
                                        <ShopCard shop={item} key={index} />
                                    ))
                                }
                            </>) : <View className=' mt-24'>

                                <EmptyAlert title='No data found.' />

                            </View>
                        }
                    </>
                )
            }
        </ScrollView>
    )
}

export default WishlistScrren