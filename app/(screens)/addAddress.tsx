import "react-native-gesture-handler";
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { API_URL, Colors } from "@/constants";
import { fetchUserProfile } from "@/redux/reducers/auth.reducer";
import { router } from "expo-router";


const addAddress = () => {
  const dispatch = useDispatch()
  const { userData, authToken, isLoading, } = useSelector((state: RootState) => state.auth);
  const [newAddress, setnewAddress] = useState({
    appartment_building_no: null,
    landmark: "",
    city: "",
    state: "",
    pin_code: null,
    contact_no: null
  });

  const [loading, setloading] = useState(false)


  // handling input Change 
  const handleInputChange = (name: string, value: string) => {
    setnewAddress(prev => ({ ...prev, [name]: value }))

  }

  // validating address field 
  const isAnyFieldEmptyOrNull = (address: Record<string, unknown>) => {
    return Object.values(address).some(
      (value) => value === null || value === ""
    );
  };

  // handling add address  fn 
  const handleAddAddress = async () => {
    // checking if any field is empty 
    if (isAnyFieldEmptyOrNull(newAddress)) {
      return Toast.show({
        type: "error",
        text1: "All fields are required.",
        text2: "Please fill all fields."
      })
    }

    const formdata = new FormData();
    formdata.append("addres", newAddress as any);

    setloading(true);

    const payload = {
      addres: newAddress
    }
    fetch(`${API_URL}/user/update`, {
      headers: {
        token: authToken,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload)
    }).then(res => res.json()).then((data: any) => {
      setloading(false);
      console.log("address add", data)
      Toast.show({
        type: "success",
        text1: "Update successfull.",
        text2: "New address added to your profile."
      })

      dispatch(fetchUserProfile({ token: authToken }) as any);

      if (!isLoading) {
        return router.back()
      }

    }).catch((e) => {
      setloading(false);
      console.log("err occured while adding new address.", e);
      return Toast.show({
        type: "error",
        text1: "Something went wrong.",
        text2: "Your request is not processed at this tome , please try again after sometime."
      })
    })

  }
  return isLoading ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={"large"} color={Colors.Primary} />
      <Text className="my-2 text-2xl text-primary font-semibold">Pleae wait...</Text>

    </View>
  ) : (
    <KeyboardAwareScrollView style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}>

      {/* building  no  */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* lable  */}
        <Text className='text-sm font-bold'>Appartment Building No:</Text>
        <View className='flex-row items-center'>
          <TextInput onChangeText={(value) => handleInputChange("appartment_building_no", value)} className="p-2 bg-gray-200 flex-grow my-2 rounded-md" placeholder='Building no:.' keyboardType="number-pad" />
        </View>
      </View>

      {/* landmark  */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* lable  */}
        <Text className='text-sm font-bold'>Landmark:</Text>
        <View className='flex-row items-center'>
          <TextInput onChangeText={(value) => handleInputChange("landmark", value)} className="p-2 bg-gray-200 flex-grow my-2 rounded-md" placeholder='langmark e.g: near Bihar Sharif Bus Stand' />
        </View>
      </View>


      {/* City */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* lable  */}
        <Text className='text-sm font-bold'>City:</Text>
        <View className='flex-row items-center'>
          <TextInput onChangeText={(value) => handleInputChange("city", value)} className="p-2 bg-gray-200 flex-grow my-2 rounded-md" placeholder='City name e.g:  Bihar Sharif ' />
        </View>
      </View>

      {/* State */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* lable  */}
        <Text className='text-sm font-bold'>State:</Text>
        <View className='flex-row items-center'>
          <TextInput onChangeText={(value) => handleInputChange("state", value)} className="p-2 bg-gray-200 flex-grow my-2 rounded-md" placeholder='State name e.g:  Bihar ' />
        </View>
      </View>

      {/* pin code */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* lable  */}
        <Text className='text-sm font-bold'>Pin Code:</Text>
        <View className='flex-row items-center'>
          <TextInput onChangeText={(value) => handleInputChange("pin_code", value)} keyboardType="number-pad" maxLength={6} className="p-2 bg-gray-200 flex-grow my-2 rounded-md" placeholder='Pin Code e.g:  803101' />
        </View>
      </View>

      {/* Contact no */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        {/* lable  */}
        <Text className='text-sm font-bold'>Contact No:</Text>
        <View className='flex-row items-center'>
          <TextInput onChangeText={(value) => handleInputChange("contact_no", value)} keyboardType="number-pad" maxLength={10} className="p-2 bg-gray-200 flex-grow my-2 rounded-md" placeholder='Contact no ' />
        </View>
      </View>

      {/* Add new address button */}
      <View className='bg-white rounded-md w-[96%] mx-auto p-2'>
        <TouchableOpacity onPress={handleAddAddress} className={`bg-primary ${loading && "bg-gray-400"}   rounded-md w-full py-3`}>
          <Text className={`text-center text-xl font-bold text-white`}>{loading ? "Adding new address..." : "Add new address"}</Text>
        </TouchableOpacity>
      </View>



    </KeyboardAwareScrollView >
  )
}

export default addAddress