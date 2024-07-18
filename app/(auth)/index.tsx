import { Text, StyleSheet, KeyboardAvoidingView, TextInput, View, TouchableOpacity, Alert, ToastAndroid, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, hp, wp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { API } from '@/utils'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { login, setLoading } from '@/redux/reducers/auth.reducer'
import { RootState } from '@/redux/store';
import * as Linking from "expo-linking"

type Props = {}

const MobileNumberScreen = (props: Props) => {
    const dispatch = useDispatch()

    const { isLoading, isError, userData } = useSelector((state: RootState) => state.auth)

    // state 
    const [phone, setphone] = useState("");
    const [otpResponse, setotpResponse] = useState<any>({});
    const [modelOpen, setmodelOpen] = useState(false);
    const [userOtp, setuserOtp] = useState("");
    const [isRegistred, setisRegistred] = useState(false)


    // handling otp send fn 
    const handleOtpSend = async () => {
        console.log("fn invoked");

        if (phone.length < 10) {
            Toast.show({
                type: 'error',
                text1: 'Invalid phone number.',
                text2: "Please check your phone number"
            });
        }
        dispatch(setLoading(true))

        const res = await API.post("SendOtp", { mobile_no: phone });

        dispatch(setLoading(false))
        console.log(res.data);
        setotpResponse(res.data)
        Toast.show({
            type: 'success',
            text1: 'OTP sent successfully.',
        });
        if (res.data.account_status === "registred") {
            setisRegistred(true)
        }
        setmodelOpen(true)


    }
    // handling otp verify fn 

    const verifyOtp = () => {
        // checking otp length 
        if (userOtp.length < 6) {
            return ToastAndroid.show("OTP to short.", 1000)
        }
        // checking if otp is valid 
        if (userOtp !== otpResponse.otp) {
            return ToastAndroid.show("Invalid otp", 2000)
        }

        if (isRegistred) {
            // login fn 
            console.log("login initiated")
            dispatch(setLoading(true))
            dispatch(login({ phone_no: phone, otp: userOtp }) as any)

            if (userData.full_name) {
                return router.replace(`/(tabs)/home/`)
            }

        } else {
            return router.replace(`/(auth)/register?phone=${phone}`)
        }
    }





    useEffect(() => {
        dispatch(setLoading(false))
        if (userData.full_name) {
            return router.replace(`/(tabs)/home/`)
        }
    }, [])

    return (
        <SafeAreaView style={styles.container} >

            {/* skip button  */}

            <Text onPress={() => router.replace(`/(tabs)/home/`)} className='text-primary text-xl font-semibold absolute top-12 right-4'>Skip</Text>
            {/* otp model  */}

            <Modal visible={modelOpen}>
                {/* header  */}
                <View className='w-[96%] mx-auto rounded-md bg-slate-100 p-2  flex-row my-4 items-center justify-between'>
                    <Text className='text-2xl text-primary font-semibold'>Verify your OTP.</Text>

                    <Ionicons onPress={() => setmodelOpen(false)} name='close' color={"red"} size={26} />
                </View>

                {/* otp box  */}


                <KeyboardAvoidingView>
                    <View className='w-[80%] mx-auto'>
                        <Text className='text-primary text-center my-4 text-4xl font-semibold'>Enter your OTP</Text>

                        <TextInput maxLength={6} onChangeText={setuserOtp} className='bg-gray-200  p-2 rounded-md text-3xl text-center font-semibold' placeholder='OTP' />
                    </View>

                    <TouchableOpacity onPress={verifyOtp} className={`bg-primary ${isLoading && "bg-gray-500"} w-[80%] py-3 rounded-md mx-auto my-4`}>
                        <Text className='text-white text-xl font-semibold text-center'>{isRegistred ? "Login" : isLoading ? "please wait..." : "Verify"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>
            <Text style={styles.title}>Enter your Phone number</Text>
            <Text className='text-md text-gray-500 font-semibold'>Enter your phone number to continue. We just need your phone number to verify your identity in our app.</Text>
            <KeyboardAvoidingView>
                <View className='bg-gray-200 flex-row  rounded-md items-center w-full my-4 p-2'>
                    <Ionicons name='call' size={20} color={Colors.Primary} />
                    <TextInput maxLength={10} onChangeText={setphone} className='text-2xl ml-2 flex-grow font-semibold p-2' keyboardType='number-pad' placeholder='Enter your phone number'
                    />
                    {phone.length > 0 && <Ionicons onPress={() => { setphone("") }} name='close' size={20} color={"red"} />}
                </View>

                <TouchableOpacity onPress={handleOtpSend} className={`bg-primary ${isLoading && "bg-gray-600"} py-3 rounded-md`}>
                    <Text className='text-white text-2xl text-center'>{isLoading ? "Please wait..." : "Continue"}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>


            <View style={{marginBottom:hp(10)}} className='flex-grow items-end justify-end'>

                <TouchableOpacity onPress={() => Linking.openURL("https://xecurecode.tech")} className='flex-row items-center justify-center w-full '>
                    <Text className='text-lg  text-gray-500 font-semibold'>Powerd by</Text>
                    <Text className='text-lg  ml-2 text-primary font-semibold'>XecureCode</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default MobileNumberScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        position: "relative",
        paddingTop: hp(8)

    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: Colors.Primary,
        marginBottom: hp(2)


    }
})