import { View, Text, Alert, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, Colors, hp, ScreenHeight, wp } from '@/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as ImagePicker from "expo-image-picker"
import Animated, { FadeInDown } from 'react-native-reanimated';

const ShopBanners = () => {
    const { userShop, authToken } = useSelector((state: RootState) => state.auth)
    const [previousBanners, setpreviousBanners] = useState<any[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [mode, setmode] = useState<boolean>(false);
    const [shopBanner, setshopBanner] = useState<ImagePicker.ImagePickerAsset[]>([])


    // handling Image selection action 

    const handleImageSelect = async () => {
        await ImagePicker.getMediaLibraryPermissionsAsync();
        if (shopBanner.length === 4) {
            return Alert.alert("You can only upload 4 images as banner.")
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
        })

        if (result.canceled) {
            return Toast.show({
                type: "error",
                text1: "No Iamge selected."
            })
        }
        if (shopBanner.length === 4) {
            return Toast.show({
                type: "info",
                text1: "only 4 images are allowed.",
                text2: "you can only select 4 images for your product banner."
            })
        } else {
            setshopBanner(prev => ([...prev, result.assets[0]]))
        }
    }

    const fetchPreviousBanner = async () => {
        try {
            const res = await fetch(`${API_URL}/shopBanner?shop=${userShop?._id}`);
            const data = await res.json();
            setpreviousBanners(data.banner?.banners)
        } catch (error) {
            Alert.alert("Server unreachable", "Unable to connect to the server.");
            return
        } finally {
            setloading(false)
        }
    }


    const handleBannerCreate = async () => {
        setloading(true)
        try {
            if (!shopBanner.length) {
                return Alert.alert("Banner Image Required.", "Please select at least a image.")
            }
            const formdata = new FormData()

            formdata.append("shop", userShop?._id);


            shopBanner.map((item) => (
                formdata.append("banner", {
                    uri: item.uri,
                    name: "shop banner",
                    type: item.mimeType
                } as any)
            ))

            const res = await fetch(`${API_URL}/shopBanner`, {
                method: "POST",
                headers: {
                    token: authToken,
                    "Content-Type": "multipart/form-data"
                },
                body: formdata
            })
            const data = await res.json();
            if (data?.success) {
                setpreviousBanners(data?.banner?.banners);
                setmode(false)
            }
        } catch (error) {
            console.log("err", error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchPreviousBanner()
    }, [])






    return (
        <ScrollView className='flex-1 px-[4%] pt-3 pb-16'>
            {
                !mode ? (
                    <View>
                        {previousBanners.length > 0 ? (
                            <View className='w-[96%] flex-row mx-auto p-2 items-center justify-center flex-wrap bg-gray-200 rounded-md shadow-md shadow-black/50'>

                                <TouchableOpacity onPress={() => setmode(true)} className='bg-white rounded-full p-2 absolute top-2 right-4 shadow-md shadow-black/80 z-50'>
                                    <MaterialCommunityIcons color={Colors.Primary} name='file-edit-outline' size={26} />
                                </TouchableOpacity>
                                {
                                    previousBanners.map((item, index) => (
                                        <Image key={index} source={{ uri: item.url }} className='w-[100%]  my-2 rounded-md object-contain aspect-video shadow-md h-24' />
                                    ))
                                }
                            </View>
                        ) : (


                            <View>
                                <Animated.View entering={FadeInDown.delay(200).springify()} className='w-[96%] mx-auto p-2 items-center justify-center flex-wrap min-h-[300px] bg-gray-200 rounded-md shadow-md shadow-black/50'>

                                    <Ionicons name='tv-outline' size={114} color={Colors.Primary} />
                                    <Text className='text-2xl font-medium mb-4'>Add some banner images</Text>

                                    <Text className='text-center opacity-60 font-medium text-md mb-4'>These image will be shown on your shop page along with where your all items are listed.</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setmode(true)
                                        }}
                                        className='bg-primary w-full py-4 rounded-md shadow-md shadow-black/80 items-center justify-center'>
                                        <Text className='text-white text-lg font-semibold'>Create Shop Banner</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>

                        )

                        }
                    </View>
                ) : (
                    <View>
                        <View style={{ minHeight: hp(25) }} className='bg-white items-center justify-center rounded-md w-[96%] mx-auto p-2'>

                            {
                                !shopBanner.length && <Text className='text-xl font-medium text-primary text-center w-full mb-2'>Choose product images.</Text>
                            }

                            <View className='w-full  flex-row flex-wrap  mb-2'>
                                {
                                    shopBanner.length > 0 && shopBanner.map((item, index) => (
                                        <View key={index} className=' w-[45%] m-2 h-32'>
                                            <Image source={{ uri: item.uri }} className='w-full rounded-md  h-full object-cover' />
                                        </View>
                                    ))
                                }
                            </View>

                            {/* add images button  */}
                            <TouchableOpacity onPress={handleImageSelect} className='flex-row mx-auto w-[50%] p-3 shadow-lg shadow-black bg-primary justify-center rounded-md items-center '>
                                <Ionicons name='images-outline' color={"#fff"} size={28} />
                                <Text className='text-lg text-white font-medium ml-2'>Add images</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={handleBannerCreate}
                            className={`${loading ? "bg-gray-400" : "bg-primary"} py-4 items-center flex-row  justify-center my-4 rounded-md shadow-md shadow-black/60 mt-8`}>
                            {loading && (
                                <ActivityIndicator size={"small"} color={Colors.Primary} />
                            )}
                            <Text className={`text-white ${loading && "ml-4"} text-lg font-semibold`}>{loading ? "Please wait..." : "Upload banner"}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default ShopBanners