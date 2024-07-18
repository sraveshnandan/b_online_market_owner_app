import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Ionicons } from '@expo/vector-icons'
import { API_URL, Colors } from '@/constants'
import Toast from 'react-native-toast-message'
import { setUserData } from '@/redux/reducers/auth.reducer'
import { router } from 'expo-router';
import * as ImagePicker from "expo-image-picker"

const updateProfileScreen = () => {
  const dispatch = useDispatch()
  const { userData, authToken } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState<string>(userData.full_name);
  const [email, setemail] = useState<string>(userData.email);
  const [pin_code, setpin_code] = useState<any>(userData.pin_code)
  const [avatar, setavatar] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(false)




  // handling image selection 

  const handleImageSelection = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 0.9,
      allowsEditing: true,
      allowsMultipleSelection: false

    })


    if (!result.canceled) {
      setavatar(result.assets[0]);
      Toast.show({
        type: "success",
        text1: "Image selected successfully."
      })

    } else {
      return Toast.show({
        type: "error",
        text1: "NO image selected."
      })
    }
  }



  // handling profile update 



  const handleProfileUpdate = async () => {

    const formdata = new FormData();


    formdata.append("full_name", name);
    formdata.append("email", email);
    formdata.append("pin_code", pin_code);

    // if user selected a new profile image 

    if (avatar) {


      formdata.append("avatar", {
        uri: avatar.uri,
        name: "avatar_image",
        type: "image/jpg" || avatar.mimeType
      } as any)
    }

    setloading(true)
    fetch(`${API_URL}/user/update`, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: authToken
      },
      body: formdata,
      method: "POST"
    }).then(res => res.json()).then((data: any) => {

      const { full_name, email, avatar, pin_code } = data.updatedProfile

      console.log(data.message)
      const updatedData = {
        full_name,
        email,
        avatar,
        pin_code
      }

      dispatch(setUserData({ ...updatedData }));
      setloading(false);

      Toast.show({
        type: "success",
        text1: "Profile updated successfully.",
        text2: "Your profile is updated now."
      })

      setTimeout(() => {
        return router.back()
      }, 1000)


    }).catch((e: any) => {
      setloading(false)
      console.log("error occred while updating user profile.", e.message);
      return Toast.show({
        type: "error",
        text1: "Oops, Something went wrong.",
        text2: "please try again after sometime."
      })
    })


  }


  return (
    <View className='flex-1 p-2'>
      {/* user avatar section  */}
      <View className='bg-white rounded-md my-4 py-4 w-[96%] mx-auto items-center justify-center'>
        {
          avatar?.uri ? (<View>
            <Image source={{ uri: avatar.uri }} className='w-36 h-36 object-cover rounded-full' />
            {/* change button  */}
            <View className='absolute bg-gray-200 rounded-full p-2 bottom-2 right-2'>
              <Ionicons onPress={handleImageSelection} name='cloud-upload-outline' size={18} color={Colors.Primary} />
            </View>
          </View>) : (<View>
            <Image source={{ uri: userData.avatar.url }} className='w-36 h-36 object-cover rounded-full' />
            {/* change button  */}
            <View className='absolute bg-gray-200 rounded-full p-2 bottom-2 right-2'>
              <Ionicons onPress={handleImageSelection} name='cloud-upload-outline' size={18} color={Colors.Primary} />
            </View>
          </View>)
        }
      </View>

      {/* full name  */}
      <KeyboardAvoidingView className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* input lable  */}
        <Text className='text-sm font-semibold'>Full name</Text>
        <TextInput onChangeText={setName} keyboardType='default' value={name} placeholder={userData.full_name} className=' p-2 text-md font-semibold bg-gray-200 rounded-md ' />
      </KeyboardAvoidingView>

      {/* email  */}
      <KeyboardAvoidingView className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* input lable  */}
        <Text className='text-sm font-semibold'>Email</Text>
        <TextInput onChangeText={setemail} keyboardType='default' value={email} placeholder={userData.email} className=' p-2 text-md font-semibold bg-gray-200 rounded-md ' />
      </KeyboardAvoidingView>

      {/* pin code */}
      <KeyboardAvoidingView className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* input lable  */}
        <Text className='text-sm font-semibold'>Pin Code</Text>
        <TextInput onChangeText={setpin_code} keyboardType='number-pad' value={pin_code} maxLength={6} placeholder={String(userData.pin_code)} className=' p-2 text-md font-semibold bg-gray-200 rounded-md ' />
      </KeyboardAvoidingView>



      {/* submit button */}
      <KeyboardAvoidingView className='bg-white rounded-md w-[96%] mx-auto p-2'>
        <TouchableOpacity onPress={handleProfileUpdate} className={`w-[96%] ${loading ? "bg-gray-400" : "bg-primary"} mx-auto  rounded-md py-3 `}>
          <Text className={`text-white text-xl font-semibold text-center`}>{loading ? "Updating..." : "Update"}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default updateProfileScreen

