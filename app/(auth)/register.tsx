import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL, hp } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { fetchUserProfile, registerUser } from '@/redux/reducers/auth.reducer'

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const params = useLocalSearchParams();
    const [phone, setphone] = useState(params.phone);
    const [full_name, setfull_name] = useState("");
    const [email, setemail] = useState("");
    const [pin_code, setpin_code] = useState("");
    const [loading, setloading] = useState(false);
    const [referStateOpen, setreferStateOpen] = useState(false);
    const [referCode, setreferCode] = useState("")


    // handle registration fn 

    const handleRegister = async () => {

        if (!email.includes("@") || email.length === 0) {
            return Toast.show({
                type: "error",
                text1: "Invalid email provided."
            })

        }

        if (full_name.length === 0 || pin_code.length === 0) {
            return Toast.show({
                type: "error",
                text1: "Invalid Input.",
                text2: "Please fill all fields."
            })

        }

        const apiBodypayload = {
            full_name, email, phone, referCode, pin_code
        }

        setloading(true);

        fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiBodypayload)
        }).then(res => res.json()).then((data: any) => {
            setloading(false);
            if (data.success) {
                console.log("data.success", data)
                dispatch(fetchUserProfile({ token: data.token }) as any)
                dispatch(registerUser({ ...data }));
                Toast.show({
                    type: "success",
                    text1: "Account created successfully."
                })
                if (!data.user.isShopOwner) {
                    return router.replace(`/(auth)/startBusiness`)

                }

                return router.replace("/(tabs)/home/")

            } else {
                return Toast.show({
                    type: "error",
                    text1: "Something went wrong.",
                    text2: `${data.message}`
                })
            }

        }).catch((e: any) => {
            setloading(false);
            console.log("err in registration", e);
            return Toast.show({
                type: "error",
                text1: "Something went wrong.",
                text2: "Please try again after sometime."
            })
        })





    }


    return (
        <ScrollView className={`flex-1 px-4 `} style={{ paddingTop: hp(8) }}>
            <View className=' flex-col w-full items-start'>
                <Text className='text-black antialiased  mb-2 mt-4 font-semibold text-4xl'>Create your account in </Text>
                <Text className='bg-white font-semibold text-primary text-4xl rounded-md shadow-lg shadow-black p-2'>B Online market</Text>

            </View>




            <KeyboardAvoidingView className='my-4 bg-white rounded-md  p-2'>
                {/* lable  */}
                <Text className='text-sm font-semibold'>Full Name:</Text>
                <TextInput onChangeText={setfull_name} className='bg-gray-200 rounded-md my-2 p-2 font-semibold' placeholder='Enter your full name' />



                {/* mobile no  */}
                <Text className='text-sm font-semibold'>Mobile No:</Text>
                <View className='flex-row items-center pr-4 bg-gray-200 rounded-md my-2'>
                    <TextInput readOnly className='bg-gray-200 flex-grow rounded-md  p-2 font-semibold' placeholder='Enter your full name' value={phone as string} />
                    <Ionicons name='shield-checkmark-sharp' size={22} color={"green"} />
                </View>


                {/* email  */}
                <Text className='text-sm font-semibold'>Email:</Text>
                <TextInput onChangeText={setemail} keyboardType='email-address' className='bg-gray-200 rounded-md my-2 p-2 font-semibold' placeholder='Enter your email' />


                {/* pin code   */}
                <Text className='text-sm font-semibold'>Pin Code:</Text>
                <TextInput onChangeText={setpin_code} keyboardType='number-pad' maxLength={6} className='bg-gray-200 rounded-md my-2 p-2 font-semibold' placeholder='Enter your pin code' />

                {

                    referStateOpen ? (
                        <>
                            {/* pin code   */}
                            <Text className='text-sm font-semibold'>Refer Code:</Text>
                            <TextInput onChangeText={setreferCode} keyboardType='number-pad' maxLength={6} className='bg-gray-200 rounded-md my-2 p-2 font-semibold' placeholder='Enter your refer code' /></>
                    ) : <Text onPress={() => setreferStateOpen(true)} className='my-2 text-primary self-end font-semibold'>I have a refer code </Text>
                }

                <TouchableOpacity onPress={handleRegister} className={`${loading ? "bg-gray-500" : "bg-primary"} py-4 rounded-md  my-2`}>
                    <Text className={`text-center text-xl font-semibold text-white`}>{loading ? "Please wait..." : "Regiter"}</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>






        </ScrollView>
    )
}

export default RegisterScreen