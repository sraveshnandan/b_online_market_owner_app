import { Text, StyleSheet, KeyboardAvoidingView, TextInput, View, TouchableOpacity, ToastAndroid, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, hp, wp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { API } from '@/utils'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, loginUser, setLoading } from '@/redux/reducers/auth.reducer'
import { RootState } from '@/redux/store'
import * as Linking from "expo-linking"
import { fetchAlldata } from '@/redux/reducers/main.reducers'

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
        try {

            const res = await API.post("SendOtp", { mobile_no: phone });
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
        } catch (error) {
            console.log("unable to send otp now.");
            return Toast.show({
                type: "error",
                text1: "Something went wrong.",
                text2: "Unable to send otp  now , please try again later."
            })
        } finally {
            dispatch(setLoading(false))
        }


    }
    // handling otp verify fn 

    const verifyOtp = async () => {
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
            try {
                dispatch(setLoading(true));


                const resp = await fetch("https://bom-api-1-0-1.onrender.com/api/v1/user/login", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ phone_no: phone, otp: userOtp })
                })
                const loginRes = await resp.json()

                dispatch(loginUser(loginRes));
                dispatch(fetchAlldata() as any)

                if (!loginRes.user.isShopOwner) {
                    return router.push(`/(auth)/startBusiness`)
                }

                Toast.show({
                    type: "success",
                    text1: "Logged in successfully."
                });

                dispatch(fetchUserProfile({ token: loginRes.token }) as any)

                return router.replace(`/(tabs)/home/`)


            } catch (error) {
                console.log("err while login fn init.", error)
                return Toast.show({
                    type: "error",
                    text1: "Something went wrong.",
                    text2: "Unable to proceed your request."
                })
            } finally {
                dispatch(setLoading(false))
            }



        } else {
            return router.replace(`/(auth)/register?phone=${phone}`)
        }
    }





    useEffect(() => {
        dispatch(setLoading(false));
        if (userData._id) {
            return router.replace(`/(tabs)/home/`)
        }
    }, [])


    return (
        <SafeAreaView style={styles.container} >
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
                    <TextInput value={phone} maxLength={10} onChangeText={setphone} className='text-2xl ml-2 flex-grow font-semibold p-2' keyboardType='number-pad' placeholder='Enter your phone number'
                    />
                    {phone.length > 0 && <Ionicons onPress={() => { setphone("") }} name='close' size={20} color={"red"} />}
                </View>

                <TouchableOpacity onPress={handleOtpSend} className={`bg-primary ${isLoading && "bg-gray-600"} py-3 rounded-md`}>
                    <Text className='text-white text-2xl text-center'>{isLoading ? "Please wait..." : "Continue"}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>


            <View style={{ marginBottom: hp(10) }} className='flex-grow items-end justify-end'>

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