import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import { hp } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { router } from 'expo-router'
import { setUserShopData } from '@/redux/reducers/auth.reducer'


type Props = {}

const EditShop = (props: Props) => {
    const dispatch = useDispatch()

    const { authToken, userShop } = useSelector((state: RootState) => state.auth)


    const [shopImage, setshopImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [shopbanner, setshopbanner] = useState(userShop.banners[0].url)
    const [loading, setloading] = useState(false);
    const [shopData, setshopData] = useState({
        name: userShop.name,
        address: userShop.address,
        pin_code: String(userShop.pin_code),
        description: userShop.description
    })


    // handling image select 

    const handleImageSelect = async () => {
        await ImagePicker.getMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.9,
            aspect: [16, 9],
            allowsMultipleSelection: false
        })


        if (!result.canceled) {
            setshopImage(result.assets[0]);
            setshopbanner(result.assets[0].uri)
            console.log(result.assets[0].type)
            return Toast.show({
                type: "success",
                text1: "Image selected successfully."
            })
        } else {
            return Toast.show({
                type: "error",
                text1: "No image selected."
            })
        }
    }





    // handling shop create 

    const handleShopEdit = async () => {
        if (shopData.address.length === 0 || shopData.name.length === 0 || shopData.description.length === 0 || shopData.pin_code.length === 0) {
            return Toast.show({
                type: "error",
                text1: "All fields are required.",
                text2: "Please fill all fields."
            })

        }
        // creating shop body payload 
        const formdata = new FormData();
        formdata.append("name", shopData.name);
        formdata.append("description", shopData.description);
        formdata.append("address", shopData.address);
        formdata.append("pin_code", shopData.pin_code);
        if (shopImage?.uri) {
            formdata.append("banner", {
                uri: shopImage.uri,
                name: shopImage.fileName || "shop banner",
                type: shopImage.mimeType || "image/jpeg"
            } as any)

        }
        setloading(true);
        try {
            const res = await fetch(`https://bom-api-1-0-1.onrender.com/api/v1/shop/update?id=${userShop._id}`, {
                method: "PUT",
                headers: {
                    token: authToken,
                    "Content-Type": "multipart/form-data"
                },
                body: formdata
            })
            const apiRes = await res.json();
            if (apiRes.success) {
                Toast.show({
                    type: "success",
                    text1: `${apiRes.message}`
                })
                dispatch(setUserShopData(apiRes.updatedShop))
                return router.replace(`/(tabs)/home/`)
            } else {
                return Toast.show({
                    type: "error",
                    text1: "Something went wrong.",
                    text2: "Unable to update your shop now, please try againg after sometimes."
                })
            }
        } catch (error: any) {

            console.log("err while updating shop", error);
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
        <ScrollView className='flex-1 p-2'>

            {
                loading && (
                    <View style={{ height: hp(100) }} className='z-50 w-full absolute  opacity-75 items-center justify-center  bg-gray-100'>
                        <View className='items-center bg-white w-[70%] mx-auto rounded-md p-4 justify-center'>
                            <Text className='text-xl font-semibold text-primary'>
                                Updating your shop Details
                            </Text>
                            <Text className='text-sm font-semibold mt-2 text-black/60'>
                                Please wait...
                            </Text>
                        </View>
                    </View>
                )
            }
            <Text className='text-md font-semibold text-primary'>Choose shop  banner image</Text>

            <View className='w-[98%] h-52 items-center justify-center bg-white rounded-md p-2 mx-auto my-2'>
                {
                    !shopbanner ? (
                        <TouchableOpacity onPress={handleImageSelect} className='items-center bg-primary p-2 rounded-md flex-row'>
                            <Ionicons color={"#fff"} name='add-circle-outline' size={26} />
                            <Text className='text-md font-semibold text-white ml-2'>Choose Banner Image</Text>
                        </TouchableOpacity>
                    ) : (
                        <View className='relative h-full w-full'>
                            <View className='absolute top-2 right-2 z-50  bg-white rounded-full items-center justify-center p-1'>
                                <Ionicons onPress={() => setshopbanner(null as any)} name='close-circle-sharp' size={22} color={"red"} />
                            </View>
                            <View>
                                <Image source={{ uri: shopbanner }} width={100} height={100} className='w-full z-10 h-full rounded-md object-cover' />
                            </View>
                        </View>
                    )
                }
            </View>


            <KeyboardAvoidingView className='mx-auto mb-2 bg-white rounded-md p-2 w-[98%]'>
                {/* shop name  */}
                <Text className='text-md font-semibold text-primary mb-2 '>Shop Name:</Text>
                <TextInput value={shopData.name} onChangeText={(value) => setshopData(prev => ({ ...prev, name: value }))} className='bg-gray-200 rounded-md text-md font-semibold p-2' placeholder='Shop name eg: Shyam Genral Store' />
            </KeyboardAvoidingView>


            <KeyboardAvoidingView className='mx-auto mb-2 bg-white rounded-md p-2 w-[98%]'>
                {/* shop address */}
                <Text className='text-md font-semibold text-primary mb-2 '>Shop address:</Text>
                <TextInput value={shopData.address} onChangeText={(value) => setshopData(prev => ({ ...prev, address: value }))} className='bg-gray-200 rounded-md text-md font-semibold p-2' placeholder='Shop address eg: Bihar Sharif, Nalanda' />
            </KeyboardAvoidingView>


            <KeyboardAvoidingView className='mx-auto mb-2 bg-white rounded-md p-2 w-[98%]'>
                {/* shop Description  */}
                <Text className='text-md font-semibold text-primary mb-2 '>Shop Description:</Text>
                <TextInput value={shopData.description} onChangeText={(value) => setshopData(prev => ({ ...prev, description: value }))} multiline={true} className='bg-gray-200 rounded-md text-md font-semibold p-2' placeholder='Shop Description eg: We provide best products in our city.' />
            </KeyboardAvoidingView>

            <KeyboardAvoidingView className='mx-auto mb-2 bg-white rounded-md p-2 w-[98%]'>
                {/* shop Pin Code  */}
                <Text className='text-md font-semibold text-primary mb-2 '>Pin Code </Text>
                <TextInput value={String(shopData.pin_code)} onChangeText={(value) => setshopData(prev => ({ ...prev, pin_code: value }))} keyboardType='number-pad' maxLength={6} className='bg-gray-200 rounded-md text-md font-semibold p-2' placeholder='Pin Code eg: for user recomendation system.' />
            </KeyboardAvoidingView>


            <TouchableOpacity onPress={handleShopEdit} className={`bg-primary rounded-md py-3 w-[98%] mx-auto ${loading && "bg-gray-200"}`}>

                <Text className='text-center text-white font-semibold text-md'>{loading ? "Creating..." : "Edit Shop"}</Text>

            </TouchableOpacity>

        </ScrollView>
    )
}

export default EditShop