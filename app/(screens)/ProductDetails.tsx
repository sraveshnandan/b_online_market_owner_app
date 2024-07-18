import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { IProduct } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ProductCard, ProductImageSlider } from '@/components';
import { wp } from '@/constants';
import { calculatePercentage } from '@/utils';
import { Image } from 'react-native';
import { addProductToCart } from '@/redux/reducers/cart.reducers';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailsScreen = () => {
    // hooks 
    const params = useLocalSearchParams();
    const dispatch = useDispatch()
    const { products } = useSelector((state: RootState) => state.main);
    const { authState } = useSelector((state: RootState) => state.auth);
    // states 
    const [product, setproduct] = useState<IProduct>(products.find(p => p._id.toString() === params.product_id)!);
    const [similarProducts, setsimilarProducts] = useState<IProduct[]>();
    const [addedtoCart, setaddedtoCart] = useState<boolean>(false)


    // filtering similar product 

    const findSimilarProduct = () => {
        const p = products.filter(p => p.categories.some(c => c._id.toString() === product.categories[0]._id.toString()));
        setsimilarProducts(p)
    }



    // handling product cart action 
    const handleAddToCart = () => {
        if (!authState) {
            return Toast.show({
                type: "info",
                text1: "Unauthorised",
                text2: "Please login to perform this operation."
            })

        }
        if (addedtoCart) {
            return router.push(`/(screens)/cart`)
        }
        dispatch(addProductToCart({ ...product }));
        setaddedtoCart(true)
    }

    useEffect(() => {
        findSimilarProduct()
    }, [])



    return (

        <>
            <ScrollView className='flex-1  px-2 py-8'>


                <ProductImageSlider images={product.banners} />

                {/* product details  */}

                <View className='mt-4'>


                    <View className='bg-gray-500 p-1 mb-4 rounded-full w-[30%] items-center justify-center '>
                        <Text className=' text-white'>Special offer</Text>
                    </View>

                    <Text className='text-2xl text-black  font-semibold'>{product.name}</Text>
                    {/* price  */}


                    <View className="flex-row items-center mt-4">
                        <Text className='text-lg font-semibold mr-4'>offer price:</Text>
                        <Text className="text-4xl mr-2 text-green-600">
                            ₹{product.discountPrice}
                        </Text>
                        <Text className="text-xl text-red-400 line-through">
                            ₹{product.originalPrice}
                        </Text>

                        <Text className='ml-4 text-lg font-semibold text-green-600'>{calculatePercentage(product.originalPrice, product.discountPrice)}%</Text>
                    </View>

                    <Text className='text-lg font-semibold mt-4'>Product description:</Text>
                    <Text className='text-lg font-semibold text-gray-500 '>{product.description || "No description provided by the seller."}</Text>


                    {/* product category  */}
                    <Text className='text-lg font-semibold mt-4'>Product categories:</Text>
                    <View className='w-[96%] flex-row flex-wrap items-center gap-2 my-2'>
                        {
                            product.categories.map((item, index) => (
                                <TouchableOpacity onPress={() => router.push(`/(screens)/productByCategory?category=${JSON.stringify(item)}`)} key={index} className='flex-row bg-white rounded-md  items-center p-2'>
                                    <Image source={{ uri: item.image.url }} className='w-10 h-10 rounded-md' />
                                    <Text className='text-lg font-semibold ml-4 text-primary '>{item.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>




                    {/* similar Products  */}
                    <Text className='text-2xl font-semibold my-4'>similar products:</Text>

                    {
                        similarProducts?.length ? (
                            <>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full p-2 mb-8'>
                                    {similarProducts.map((item, index) => <View style={{ width: wp(50), marginHorizontal: 10 }}>
                                        {/* indicator  */}
                                        <View className='bg-blue-500 p-2 shadow-lg shadow-black absolute flex-row items-center z-50 rounded-md'>
                                            <Ionicons name='trending-up-outline' size={22} color={"#fff"} />
                                            <Text className='text-sm text-white font-semibold ml-2'>Similar</Text>
                                        </View>
                                        <ProductCard cardWidth={"100%"} pr={item} key={index} /></View>)}
                                </ScrollView>
                            </>
                        ) : <></>
                    }



                </View>


                {/* seller details  */}
                <Text className='text-lg font-semibold mt-4'>Sold by:</Text>
                <View className='mt-4 mb-12 items-center justify-center bg-white  p-2 mx-auto rounded-md w-[96%]'>
                    <Image source={{ uri: product.owner.banners[0].url }} className='w-24 h-24 rounded-md' />
                    <Text className='text-2xl font-semibold text-primary'>{product.owner.name}</Text>
                    <Text className='text-lg font-semibold text-gray-400'>{product.owner.address}</Text>

                    <TouchableOpacity onPress={() => router.replace(`/(tabs)/home/shop_details?shopId=${product.owner._id}&name=${product.owner.name}`)} className='bg-primary rounded-md my-4 py-3 w-full'><Text className='text-center text-white text-lg font-semibold'>View all products</Text></TouchableOpacity>
                </View>


            </ScrollView>



            {/* add to cart button  */}
            <TouchableOpacity onPress={handleAddToCart} className={`bg-primary ${addedtoCart && "bg-green-500"} rounded-md w-[96%] mb-4 mx-auto py-3`}>
                <Text className='text-lg font-semibold text-white text-center'>{addedtoCart ? "View in cart" : "Add to cart"}</Text>
            </TouchableOpacity>
        </>

    )
}

export default ProductDetailsScreen
