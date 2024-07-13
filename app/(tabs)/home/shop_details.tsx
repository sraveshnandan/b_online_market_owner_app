import { View, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Colors, hp, tintColorLight } from '@/constants';
import { AntDesign } from '@expo/vector-icons';
import { EmptyAlert, ProductCard, SupportModel } from '@/components';
import { IProduct } from '@/types';

const shopDetailsScreen = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams()
    const { products, shops } = useSelector((state: RootState) => state.main);
    const [modelOpen, setmodelOpen] = useState(false)

    // states 
    const [shopProducts, setshopProducts] = useState<IProduct[]>([])

    // setting navigation data 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${params?.name?.substring(0, 15)}...`,
            headerSearchBarOptions: {
                inputType: "text",
                headerIconColor: tintColorLight,
                shouldShowHintSearchIcon: true,
                placeholder: 'Search products ...',
                onChangeText: (event: any) => {
                    const query = event.nativeEvent.text;
                    // Add your search logic here
                    console.log(query);
                },
                autoCapitalize: 'none',
                spellCheck: false,
                autoCorrect: false,
            },
            headerRight: () => <AntDesign onPress={() => setmodelOpen(prev => !prev)} name='customerservice' size={28} color={Colors.Primary} />
        })
    }, [params])



    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* help model  */}
            <SupportModel isOpen={modelOpen} setOpen={setmodelOpen} email='' phone='' />
            {/* shopProducts list  */}
            {
                shopProducts.length > 0 ? <>
                    <View className='w-full flex-row flex-wrap'>
                        {
                            shopProducts.map((item, index) => <ProductCard pr={item} />)
                        }
                    </View>
                </> : <View style={{ height: hp(50) }} className='flex-1 items-center justify-center'>
                    <EmptyAlert title='No products yet.' />
                </View>
            }
        </ScrollView>
    )
}

export default shopDetailsScreen