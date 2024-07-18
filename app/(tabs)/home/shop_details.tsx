import { View, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
    const [shopProducts, setshopProducts] = useState<IProduct[]>(products.filter(p => p.owner._id.toString() === params.shopId?.toString()));
    const [searchQuery, setSearchQuery] = useState('');
    const [shop, setshop] = useState(shops.find(s => s._id.toString() === params.shopId?.toString()))

    // setting navigation data 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${params?.name?.substring(0, 15) }...`,
            headerSearchBarOptions: {
                inputType: "text",
                headerIconColor: tintColorLight,
                shouldShowHintSearchIcon: true,
                placeholder: 'Search products ...',
                onChangeText: (event: any) => {
                    const query = event.nativeEvent.text;
                    setSearchQuery(query)
                    return handleSearch(searchQuery)
                },
                autoCapitalize: 'none',
                spellCheck: false,
                autoCorrect: false,
            },
            headerRight: () => <AntDesign onPress={() => setmodelOpen(prev => !prev)} name='customerservice' size={28} color={Colors.Primary} />
        })
    }, [params]);



    // Function to filter categories based on search query
    const handleSearch = (query: string) => {
        const filtered = shopProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setshopProducts(filtered);
    }



    useEffect(() => {
        if (searchQuery.length === 0) {
            setshopProducts(products.filter(product => product.owner._id.toString() === params.shopId))
        }
    }, [searchQuery.length])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* help model  */}
            <SupportModel isOpen={modelOpen} setOpen={setmodelOpen} email={shop?.owner?.email as string} phone={shop?.owner.phone_no!} />
            {/* shopProducts list  */}
            {
                shopProducts.length > 0 ? <>
                    <View className='w-full flex-row flex-wrap'>
                        {
                            shopProducts.map((item, index) => <ProductCard key={index} pr={item} />)
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