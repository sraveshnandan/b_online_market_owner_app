import { Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { IUser } from '@/types';

import RazorpayCheckout, { CheckoutOptions } from 'react-native-razorpay';
import { getOrderId, verifyPayment } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';


interface PaymentButtonProp {
    setLoading: Dispatch<SetStateAction<boolean>>;
    loading: boolean,
    user: IUser
}

const PaymentButton: FC<PaymentButtonProp> = ({ loading, setLoading, user }) => {


    const { authToken } = useSelector((state: RootState) => state.auth)



    const VerifyPayment = async (data: any) => {
        setLoading(true)
        try {
            const paystatus = await verifyPayment(authToken, data);

            if (!paystatus.success) {
                setLoading(false);
                return Alert.alert("Something went wrong", "Your payment is still not verified by us, please wait for 24 hours.")
            }
            return router.replace(`/(auth)/createShop`)

        } catch (error) {
            return Alert.alert("Something went wrong", "Your payment is still not verified by us, please wait for 24 hours.")

        } finally {
            setLoading(false)
        }
    }


    const handlePayment = async () => {
        try {
            setLoading(true)
            let options: CheckoutOptions = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.jpg',
                currency: 'INR',
                key: 'rzp_live_KqXuZVbz5L49B0',
                amount: 499,
                name: 'B Online Market',
                order_id: 'order_DslnoIgkIDL8Zt',
                prefill: {
                    email: user.email,
                    contact: user.phone_no,
                    name: user.full_name
                },
                theme: { color: '#ff5521' }
            }


            const orderid = await getOrderId(499, user._id);
            if (!orderid.success) {
                setLoading(false);
                return Alert.alert("Something went wrong.", "Please try again after sometimes.")
            }
            options.order_id = orderid?.apiRes?.id


            RazorpayCheckout?.open(options).then((data) => {
                // handle success
                return VerifyPayment(data)

            }).catch((error) => {
                // handle failure
                console.log("razorpay error", error)
            });





        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <TouchableOpacity
            onPress={handlePayment}
            disabled={loading}
            className={`${loading ? "bg-gray-500" : "bg-primary"} py-3 rounded-full flex-row items-center space-x-4 justify-center`}

        >
            {
                loading && (
                    <ActivityIndicator color={"#fff"} />
                )
            }
            <Text className={`text-white font-semibold text-lg `}>{loading ? "Please wait..." : "Upgrade"}</Text>
        </TouchableOpacity>
    )
}

export default PaymentButton