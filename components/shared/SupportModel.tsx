import { View, Text, Modal } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'

type Props = {
    email: string,
    phone: string | any,
    isOpen: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const SupportModel = ({ email, phone, isOpen, setOpen }: Props) => {
    return (
        <View>
            <Modal hardwareAccelerated={true} animationType='slide' visible={isOpen} >
                {/* model header  */}
                <View className='flex-row items-center  p-4 justify-between'>
                    <Text className='text-2xl text-primary/80'>We are here to help.</Text>
                    <Ionicons onPress={() => setOpen(false)} name='close-circle-outline' color={"red"} size={30} />
                </View>

                <View className='flex-1 items-center  py-24'>
                    <View className='bg-slate-100 p-8 rounded-full shadow-lg shadow-primary/80'>
                        <AntDesign name='customerservice' size={105} color={Colors.Primary} />
                    </View>


                    {/* contact details  */}

                    <View className='my-8 p-4 w-[90%]  bg-slate-50 shadow-lg shadow-black/40 rounded-md'>
                        {/* email  */}
                        <View className='flex-row items-center'>
                            <Text className='text-xl'>Email: </Text>
                            <Text className='text-xl text-primary'>{email || "support@bonlinemarket.com"}</Text>
                        </View>

                        {/* Phone no: */}
                        <View className='flex-row items-center mt-2'>
                            <Text className='text-xl'>Phone no: </Text>
                            <Text className='text-xl text-primary '>+91 {phone || 7109693299}</Text>
                        </View>

                    </View>


                </View>

            </Modal>
        </View>
    )
}

export default SupportModel