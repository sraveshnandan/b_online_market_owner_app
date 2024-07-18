import { View, Text, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { ICategory } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { EmptyAlert, ProductCard } from '@/components'
import { hp } from '@/constants'

type Props = {}

const productByCategoryScreen = (props: Props) => {
    // hooks 
    const params = useLocalSearchParams();
    const navigation = useNavigation()
    const { products } = useSelector((state: RootState) => state.main)


    // states 
    const [category, setcategory] = useState<ICategory>(JSON.parse(params.category as any));
    const [filtredProducts, setfiltredProducts] = useState(products.filter(p => p.categories.some(c => c._id === category._id)));



    // setting some header data 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${category.name}`,
            headerRight: () =>
                <View className='bg-gray-200 rounded-md p-2'>
                    <Image source={{ uri: category.image.url }} className='w-8 h-8' />
                </View>
        })
    }, [])

    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            {
                filtredProducts.length > 0 ? (
                    <View className='flex-row items-center flex-wrap justify-start mx-auto w-full'>

                        {
                            filtredProducts.map((item, index) => (
                                <ProductCard pr={item} key={index} />
                            ))
                        }
                    </View>
                ) : (
                    <View style={{height:hp(90)}} className='items-center  justify-center'>
                        <EmptyAlert title='No product found.' />
                    </View>
                )
            }
        </ScrollView>
    )
}

export default productByCategoryScreen