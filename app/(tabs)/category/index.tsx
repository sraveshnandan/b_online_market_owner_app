import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { ICategory } from '@/types'
import { tintColorLight, wp } from '@/constants'
import { router, useNavigation } from 'expo-router'

const CategoryScreen = () => {

    const navigation = useNavigation()
    const { categories } = useSelector((state: RootState) => state.main)


    // states 
    const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);
    const [searchQuery, setSearchQuery] = useState('');



    // handling header navigation search fn 

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerTitle: "Category",
                headerSearchBarOptions: {
                    inputType: "text",
                    headerIconColor: tintColorLight,
                    shouldShowHintSearchIcon: true,
                    placeholder: 'Search category ...',
                    onChangeText: (event: any) => {
                        const query = event.nativeEvent.text;
                        handleSearch(query)
                    },
                    autoCapitalize: 'none',
                    spellCheck: false,
                    autoCorrect: false,
                }
            }
        )
    }, [])

    // handling category button press 
    const handlePress = (data: ICategory) => {
        return router.push(`/(screens)/productByCategory?category=${JSON.stringify(data)}`)
    }


    // Function to filter categories based on search query
    const handleSearch = (query: string) => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    }

    useEffect(() => {
        if (searchQuery.length === 0) {
            setFilteredCategories(categories)
        }
    }, [searchQuery])
    return (
        <ScrollView className='py-4' contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }} showsVerticalScrollIndicator={false}>
            {
                filteredCategories.map((item, index) => (
                    <TouchableOpacity onPress={() => handlePress(item)} key={index} style={{ width: wp(48) }} className='bg-white p-2 items-center justify-center rounded-lg'>
                        <Image source={{ uri: item.image.url }} width={100} height={100} />
                        <Text className='font-semibold mt-1 text-xl'>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }

        </ScrollView>
    )
}

export default CategoryScreen