import { View, Text } from 'react-native'
import React from 'react'
import ShopCard from './ShopCard'
import { IShop } from '@/types'

type Props = {
    title: string,
    shops: IShop[]
}

const ShopList = ({ title, shops }: Props) => {
    return (
        <View className='w-[96%] mx-auto  my-4'>

            <Text className='text-xl font-semibold border-b-2 pb-2 mx-auto border-x-white border-b-primary  mb-4 text-center'>{title}</Text>
            {
                shops && shops.map((item, index) => (
                    <ShopCard shop={item} key={index} />
                ))
            }
        </View>
    )
}

export default ShopList