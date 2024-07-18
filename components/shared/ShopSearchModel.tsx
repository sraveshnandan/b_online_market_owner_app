import { View, Text, Modal, TextInput, ScrollView } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { IShop } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import ShopCard from './ShopCard'


type props = {
    isOpen: boolean,
    setIsopen: Dispatch<SetStateAction<boolean>>
}
const ShopSearchModel = ({ setIsopen, isOpen }: props) => {

    const { shops } = useSelector((state: RootState) => state.main)
    const [filtredShops, setfiltredShops] = useState<IShop[]>([]);
    const [searchQuery, setsearchQuery] = useState<string>("")

    // handling shop search 
    const handleSHopSearch = (query: string) => {
        if (query.length === 0) {
            setfiltredShops(shops)
        } else {
            setfiltredShops(shops.filter(s => s.name.toLowerCase().includes(query.toLowerCase())))
        }
    }


    useEffect(() => {
        searchQuery.length > 0 ? handleSHopSearch(searchQuery) : setfiltredShops(shops);
    }, [searchQuery.length])


    return (
        <Modal visible={isOpen} className='flex-1' animationType='slide'>
            {/* close button  */}
            <View className='absolute top-10 right-4 z-50'>
                <Ionicons name='close-circle-outline' color={"red"} size={29} onPress={() => {
                    setsearchQuery("");
                    setIsopen(false);
                }} />
            </View>

            {/* searchBar  */}

            <View className='flex-row items-center w-[95%] mt-8 mx-auto justify-between'>
                <TextInput onChangeText={setsearchQuery} keyboardType='default' maxLength={30} className='bg-gray-200 font-semibold text-black text-xl p-2 rounded-md flex-grow' placeholder='Search shops...' />
            </View>


            {/* shop list  */}



            <View className='w-[95%] mx-auto my-4'>
                <Text className='text-2xl text-primary font-semibold'>{searchQuery.length === 0 ? "All Shops" : `Search results of ${searchQuery} `}</Text>
                <ScrollView className='mt-2'>
                    {
                        filtredShops.map((item, index) => <ShopCard setModelState={setIsopen} shop={item} key={index} />)
                    }

                </ScrollView>
            </View>



        </Modal>
    )
}

export default ShopSearchModel