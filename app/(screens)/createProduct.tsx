import { View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { Colors, hp } from '@/constants';
import { ICategory } from '@/types';
import { addOrUpdateProducts } from '@/redux/reducers/main.reducers';
import { router } from 'expo-router';

const createProductScreen = () => {
    const dispatch = useDispatch()
    const { authToken, userShop, userData } = useSelector((state: RootState) => state.auth);
    const { categories } = useSelector((state: RootState) => state.main);
    const [productData, setproductData] = useState({
        name: "",
        description: "",
        categories: [],
        originalPrice: 0,
        discountPrice: 0,
        quantity: 0
    });
    const [productBanner, setproductBanner] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const [loading, setloading] = useState(false);
    const [categoryBoxOpen, setcategoryBoxOpen] = useState(false);
    const [selectedCategory, setselectedCategory] = useState<ICategory>();


    // handling Image selection action 

    const handleImageSelect = async () => {
        await ImagePicker.getMediaLibraryPermissionsAsync();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],

        })

        if (result.canceled) {
            return Toast.show({
                type: "error",
                text1: "No Iamge selected."
            })
        }
        if (productBanner.length === 4) {
            return Toast.show({
                type: "info",
                text1: "only 4 images are allowed.",
                text2: "you can only select 4 images for your product banner."
            })
        } else {
            setproductBanner(prev => ([...prev, result.assets[0]]))
        }
    }


    const handleCreateProduct = async () => {
        setloading(true);
        try {

            const formdata = new FormData();

            productBanner.map(b => formdata.append("banner", {
                uri: b.uri,
                name: b.fileName || "product banner",
                type: b.mimeType || "images"
            } as any));

            formdata.append("name", productData.name);
            formdata.append("description", productData.description);
            formdata.append("originalPrice", productData.originalPrice as any);
            formdata.append("discountPrice", productData.discountPrice as any);
            formdata.append("categories", [selectedCategory?._id] as any);
            formdata.append("quantity", productData.quantity as any);
            formdata.append("owner", userShop._id)


            const res = await fetch("https://bom-api-1-0-1.onrender.com/api/v1/product/create", {
                method: "POST",
                headers: {
                    token: authToken,
                    "Content-Type": "multipart/form-data"
                },
                body: formdata
            });


            const apiRes = await res.json();


            if (!apiRes.success) {
                console.log("product not created due to ", apiRes.message);
                return Toast.show({
                    type: "error",
                    text1: "Something went wrong.",
                    text2: `${apiRes.message}`
                })

            }

            console.log(apiRes);

            // redux state management 
            dispatch(addOrUpdateProducts({ ...apiRes.newProduct, owner: userShop }));

            Toast.show({
                type: "success",
                text1: "Product created successfully."
            });

            setTimeout(() => {
                return router.back()
            }, 1500)


        } catch (error: any) {
            console.log("err while creating new product", error);
            return Toast.show({
                type: "error",
                text1: "Something went wrong.",
                text2: `${error.message}`
            })

        } finally {
            setloading(false)
        }
    }

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
            <ScrollView className='flex-1 py-2'>

                {/* product images section /  */}
                <View style={{ minHeight: hp(25) }} className='bg-white items-center justify-center rounded-md w-[96%] mx-auto p-2'>

                    {
                        !productBanner.length && <Text className='text-xl font-semibold text-primary text-center w-full mb-2'>Choose product images.</Text>
                    }

                    <View className='w-full  flex-row flex-wrap  mb-2'>
                        {
                            productBanner.length > 0 && productBanner.map((item, index) => (
                                <View key={index} className=' w-[45%] m-2 h-32'>
                                    <Image source={{ uri: item.uri }} className='w-full rounded-md  h-full object-cover' />
                                </View>
                            ))
                        }
                    </View>

                    {/* add images button  */}
                    <TouchableOpacity onPress={handleImageSelect} className='flex-row mx-auto w-[50%] p-3 shadow-lg shadow-black bg-primary justify-center rounded-md items-center '>
                        <Ionicons name='images-outline' color={"#fff"} size={28} />
                        <Text className='text-lg text-white font-semibold ml-2'>Add images</Text>
                    </TouchableOpacity>
                </View>


                {/* selected category viewer */}

                {
                    selectedCategory?._id && (
                        <View className='w-[96%] my-4 bg-white rounded-md p-2 mx-auto'>
                            <Text className='text-sm font-semibold text-primary my-2'>Selected category</Text>
                            <View className='flex-row items-center p-2 bg-primary rounded-md shadow-md py-4 shadow-black '>


                                <Text className='text-white font-semibold text-lg flex-grow'>{selectedCategory.name}</Text>
                                <TouchableOpacity onPress={() => setselectedCategory({} as any)} className=' rounded-full p-1 bg-white'>
                                    <Ionicons name='close-sharp' color={"red"} size={22} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }


                {/* product category selection  */}

                <View className='w-[96%] mx-auto p-3 rounded-md    bg-white my-2'>
                    <View className='flex-row justify-between w-full'>
                        <Text className='text-lg font-semibold text-primary'>Choose Product Category</Text>
                        <Ionicons onPress={() => setcategoryBoxOpen(prev => !prev)} name={categoryBoxOpen ? "chevron-up-sharp" : "chevron-down-sharp"} size={28} />
                    </View>

                    {
                        categoryBoxOpen && (
                            <View className='bg-gray-200 p-2 my-2 overflow-y-scroll w-full rounded-md'>
                                {
                                    categories.map((item, index) => (
                                        <TouchableOpacity onPress={() => { setselectedCategory(item); setcategoryBoxOpen(prev => !prev) }} key={index} className={`${selectedCategory?._id === item._id && "bg-primary"} py-3 flex-row flex-grow items-center my-2 rounded-md `}>
                                            <Image source={{ uri: item.image.url }} width={40} height={40} className='rounded-md shadow-md shadow-black object-cover' />
                                            <Text className={`ml-2 ${selectedCategory?._id === item._id && "text-white"} text-lg font-semibold`}>{item.name}</Text>

                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        )
                    }


                </View>


                {/* other fields  */}
                {/* name  */}
                <KeyboardAvoidingView className='w-[96%] mx-auto my-2 bg-white rounded-md shadow-md shadow-stone-950 p-2' keyboardVerticalOffset={50}>
                    {/* lable  */}
                    <Text className='text-primary  font-semibold text-sm'>
                        Product Name
                    </Text>
                    {/* text input  */}
                    <TextInput value={productData.name} onChangeText={(v) => setproductData(prev => ({ ...prev, name: v }))} className='bg-gray-200 rounded-md shadow-md shadow-black p-2 mt-2 text-lg font-semibold' maxLength={50} keyboardType='default' placeholder='Product name e.g: Apple iphone 15' />
                </KeyboardAvoidingView>

                {/* description  */}
                <KeyboardAvoidingView className='w-[96%] mx-auto my-2 bg-white rounded-md shadow-md shadow-stone-950 p-2' keyboardVerticalOffset={50}>
                    {/* lable  */}
                    <Text className='text-primary  font-semibold text-sm'>
                        Product Description
                    </Text>
                    {/* text input  */}
                    <TextInput value={productData.description} onChangeText={(v) => setproductData(prev => ({ ...prev, description: v }))} multiline={true} className='bg-gray-200 rounded-md shadow-md shadow-black p-2 mt-2 text-lg font-semibold' maxLength={150} keyboardType='default' placeholder='Product description e.g: Introducing new iphone 15 with fully loaded tech.' />
                </KeyboardAvoidingView>


                {/* price  */}
                <KeyboardAvoidingView className='w-[96%] mx-auto my-2 bg-white rounded-md shadow-md shadow-stone-950 p-2' keyboardVerticalOffset={100}>
                    {/* lable  */}
                    <Text className='text-primary  font-semibold text-sm'>
                        Product Original Price
                    </Text>
                    {/* text input  */}
                    <TextInput value={productData.originalPrice as any} onChangeText={(v) => setproductData(prev => ({ ...prev, originalPrice: v as any }))} className='bg-gray-200 rounded-md shadow-md shadow-black p-2 mt-2 text-lg font-semibold' maxLength={150} keyboardType='numeric' placeholder='Product Original Price  e.g: 22000' />
                </KeyboardAvoidingView>

                {/* price  */}
                <KeyboardAvoidingView className='w-[96%] mx-auto my-2 bg-white rounded-md shadow-md shadow-stone-950 p-2' keyboardVerticalOffset={150}>
                    {/* lable  */}
                    <Text className='text-primary  font-semibold text-sm'>
                        Product Discounted  Price
                    </Text>
                    {/* text input  */}
                    <TextInput value={productData.discountPrice as any} onChangeText={(v) => setproductData(prev => ({ ...prev, discountPrice: v as any }))} className='bg-gray-200 rounded-md shadow-md shadow-black p-2 mt-2 text-lg font-semibold' maxLength={5} keyboardType='numeric' placeholder='Product Discounted Price Price  e.g: 19000' />
                </KeyboardAvoidingView>


                {/* quantuty  */}
                <KeyboardAvoidingView className='w-[96%] mx-auto my-2 bg-white rounded-md shadow-md shadow-stone-950 p-2' keyboardVerticalOffset={50}>
                    {/* lable  */}
                    <Text className='text-primary  font-semibold text-sm'>
                        Product Quantity
                    </Text>
                    {/* text input  */}
                    <TextInput value={productData.quantity as any} onChangeText={(v) => setproductData(prev => ({ ...prev, quantity: v as any }))} multiline={true} className='bg-gray-200 rounded-md shadow-md shadow-black p-2 mt-2 text-lg font-semibold' maxLength={150} keyboardType='number-pad' placeholder='Product Quantity e.g: 10' />
                </KeyboardAvoidingView>



                <TouchableOpacity onPress={handleCreateProduct} className={`bg-primary ${loading && "bg-gray-400"} rounded-md py-4 w-[96%] mx-auto my-4`}>
                    <Text className={`text-white text-xl font-semibold text-center`}>{loading ? "Creating..." : "Create Product"}</Text>

                </TouchableOpacity>


            </ScrollView>
        </>
    )
}

export default createProductScreen