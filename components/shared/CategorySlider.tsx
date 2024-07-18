import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { hp, wp } from '@/constants'
import { ICategory } from '@/types'
import { router } from 'expo-router'

type Props = {

}

const CategorySlider = (props: Props) => {
    const { categories } = useSelector((state: RootState) => state.main);
    // handleling category button press 
    const handlePress = (data: ICategory) => {
        console.log(`${data.name} pressed.`);

        return router.push(`/(screens)/productByCategory?category=${JSON.stringify(data)}`)
    }
    return (
        <ScrollView horizontal className={`my-2 ${Platform.OS === "ios" && "pt-16"}`} contentContainerStyle={{ gap: wp(4) }} showsHorizontalScrollIndicator={false}>

            {
                categories.length ? categories.map((item, index) => (
                    <TouchableOpacity onPress={() => handlePress(item)} key={index} style={{ width: wp(25) }} className='bg-white p-2 items-center justify-center rounded-lg'>
                        <Image source={{ uri: item.image.url }} width={50} height={50} />
                        <Text className='font-semibold mt-1'>{item.name}</Text>
                    </TouchableOpacity>
                )) : (
                    [1, 2, 3, 4, 5].map((index) => (
                        <View style={{ width: wp(25), height: hp(10) }} className='bg-white/80 p-2 items-center justify-center rounded-lg' key={index}>
                            <Image source={require("../../assets/images/icon.png")} className='w-8 h-8 rounded-md blur-md' />
                        </View>
                    ))
                )
            }

        </ScrollView>
    )
}

export default CategorySlider

const styles = StyleSheet.create({})