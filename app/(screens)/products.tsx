import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Toast from 'react-native-toast-message'
import { fetchAlldata, removeProduct } from '@/redux/reducers/main.reducers'
import { IProduct } from '@/types'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors, hp, wp } from '@/constants'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { router } from 'expo-router'
import { isLoaded } from 'expo-font'
import { EmptyAlert } from '@/components'


const products = () => {
    const dispatch = useDispatch()
    const { products, isloading } = useSelector((state: RootState) => state.main);
    const { userShop, authToken } = useSelector((state: RootState) => state.auth);
    const [refreshing, setrefreshing] = useState(false);
    const [loading, setloading] = useState(false)
    const [shopProducts, setshopProducts] = useState<IProduct[]>(products.filter(p => p.owner._id.toString() === userShop._id.toString()));



    // handling refresh controll 
    const onRefresh = useCallback(() => {
        setrefreshing(true);
        try {
            dispatch(fetchAlldata() as any);
            if (!isloading) {
                return Toast.show({
                    type: "success",
                    text1: "Data refreshed successfully."
                })

            }
        } catch (error) {

            return Toast.show({
                type: "error",
                text1: "Unable to refresh data."
            })
        } finally {
            setrefreshing(false)
        }



    }, [])




    // handling product edit 
    const handleProductEdit = (product: IProduct) => {

    }


    // handling product delete 
    const handleProductDelete = async (product: IProduct) => {
        setloading(true)
        try {
            console.log("deleting startted")
            const res = await fetch(`https://bom-api-1-0-1.onrender.com/api/v1/products?id=${product._id}`, {
                method: "DELETE",
                headers: {
                    token: authToken
                }

            });

            const apiRes = await res.json();
            console.log(apiRes)
            if (!apiRes.success) {
                console.log("unable to delete product due to ", apiRes.message);
                return Toast.show({
                    type: "error",
                    text1: "Something went wrong.",

                    text2: `${apiRes.message}`
                })

            }

            dispatch(removeProduct({ ...product }));
            setshopProducts(products.filter(p => p.owner._id.toString() === userShop._id.toString()))

            return Toast.show({
                type: "success",
                text1: "Product deleted successfully."
            })

        } catch (error: any) {
            console.log("unable to delete prd ", error)
            return Toast.show({
                type: "error",
                text1: "Something went wrong.",

                text2: `${error.message}`
            })

        } finally {
            setloading(false)
        }

    }


    useEffect(() => {
        setshopProducts(products.filter(p => p.owner._id.toString() === userShop._id.toString()))

    }, [products.length])


    return (
        <>
            {
                loading && (
                    <View className='bg-black/20  mx-auto  z-50 absolute  w-full h-full  items-center justify-center'>

                        <View className='bg-white rounded-md shadow-lg shadow-black w-[80%] p-12'>

                            <ActivityIndicator size={"large"} color={Colors.Primary} />
                            <Text className='text-xl mt-4 font-semibold text-center'>Please wait...</Text>
                        </View>
                    </View>
                )
            }


            <ScrollView className='flex-1 mb-4 py-2' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                {shopProducts.length > 0 ?
                    shopProducts.map((item, index) => (
                        <Animated.View style={{ height: hp(20) }} entering={FadeInDown.delay(index * 100).springify()} className='bg-white  my-2 flex-row items-center  w-[95%] overflow-x-scroll mx-auto rounded-md p-2 shadow-lg shadow-black' key={index}>
                            {/* Action section  */}


                            <View className='bg-gray-200 p-2  justify-between rounded-lg  absolute z-50 bottom-2 right-2 flex-row items-center'>
                                {/* <MaterialCommunityIcons onPress={() => handleProductEdit(item)} name='pencil-box' size={30} color={"green"} /> */}

                                <MaterialCommunityIcons onPress={() => handleProductDelete(item)} name='trash-can' size={30} color={"red"} />
                            </View>
                            {/* product image  */}
                            <View className='w-[50%] h-full'>
                                <Image source={{ uri: item.banners[0].url }} width={100} height={100} className='rounded-md shadow-lg shadow-black w-full object-cover h-full' />
                            </View>


                            <View className=' px-2 h-full flex-grow overflow-hidden  '>
                                <Text className='text-2xl font-semibold text-primary'>{item.name.substring(0, 10)}..</Text>

                                <Text className='w-[65%] text-sm opacity-80 font-semibold text-gray-400'>{item.description.substring(0, 20)}...</Text>

                                <View className='flex-row items-center'>
                                    <Text className='text-4xl font-semibold mt-2 text-green-500'>₹{item.discountPrice}</Text>
                                    <Text className='text-xl font-semibold mt-2 text-red-500 ml-4'>₹{item.originalPrice}</Text>
                                </View>



                                <View className=''>
                                    {
                                        item.categories.slice(0, 1).map((item, index) => (
                                            <Text key={index} className='m-2 p-1  text-primary rounded-full'>{item.name}</Text>
                                        ))
                                    }

                                </View>


                            </View>

                        </Animated.View>
                    )) : <EmptyAlert title='No Products yet' />
                }





            </ScrollView>

            {/* create product button  */}

            <TouchableOpacity onPress={() => router.push(`/(screens)/createProduct`)} style={{ width: wp(18) }} className=' absolute bottom-12 right-4 items-center justify-center  bg-primary rounded-full p-4'>
                <Ionicons name='add-circle-outline' size={38} color={"#fff"} />
            </TouchableOpacity>
        </>

    )
}

export default products