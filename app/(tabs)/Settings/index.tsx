import { View, Text, ScrollView, TouchableOpacity, Image, Share, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors, hp, wp } from '@/constants';
import * as Linking from "expo-linking"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/reducers/auth.reducer';
import { clearAllData } from '@/redux/reducers/main.reducers';
import { router } from 'expo-router';
import { persistor, RootState } from '@/redux/store';

type settingMenuType = { name: string, icon: string, link?: string, screen?: string }
const settingMenu: settingMenuType[] = [
    {
        name: "Give feedback",
        icon: "apps",
        link: "https://play.google.com/store/apps/details?id=com.sravesh.bom&hl=en"
    },
    {
        name: "Share this app",
        icon: "share-social",

    },

    {
        name: "Privacy Policy",
        icon: "newspaper",
        screen: "/(screens)/privacy-policy"
    },


    {
        name: "Log Out",
        icon: "log-out"
    },

]
const SettingScreen = () => {

    const dispatch = useDispatch();
    const { userData, authState } = useSelector((state: RootState) => state.auth)


    // handling share 
    const handlShare = async (link: string) => {
        try {
            const result = await Share.share({
                message: `Hey sign up with my refer code ${userData.referCode} in B Online market app and get amazing rewards. Download the app now. App Link: https://play.google.com/store/apps/details?id=com.sravesh.bom&pli=1`,

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }

    // handling btn clicks 
    const handleBtnClick = async (item: settingMenuType) => {
        if (item.link) {
            return Linking.openURL(item.link)
        }

        if (item.icon === "share-social") {
            await handlShare("");

        }

        if (item.name.includes("Log")) {
            dispatch(logout());
            dispatch(clearAllData());
            persistor.purge()
            return router.replace("/(auth)/")
        }

        if (item.screen) {
            return router.push(item.screen)

        }

    }


    useEffect(() => {
        if (!authState) {
            return router.replace("/(auth)/")
        }
    }, [])
    return authState && (
        <ScrollView showsHorizontalScrollIndicator={false} className='p-2'>
            <View style={{ height: hp(35) }} className='bg-white w-[98%] my-4 shadow-md shadow-primary items-center justify-center  mx-auto rounded-md'>
                <View style={{ width: wp(20), height: hp(9) }} className='rounded-md overflow-hidden shadow-md shadow-black/60'>
                    <Image source={require("../../../assets/images/icon.png")} className='w-full h-full object-cover' width={100} height={100} />
                </View>
                <Text className='text-center text-lg font-medium my-2'>
                    B Online Market Owner
                </Text>
            </View>
            <View className=' w-[98%] mx-auto  '>
                {
                    settingMenu.map((item, index) => (
                        <TouchableOpacity onPress={() => handleBtnClick(item)} key={index} className='px-2 py-5 shadow-md shadow-black/60 w-full  bg-white border-b-[1px] border-b-gray-200 mb-2 mx-auto flex-row items-center'>
                            <Ionicons name={item.icon as any} size={28} color={Colors.Primary} />
                            <Text className='text-md font-semibold ml-2'>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default SettingScreen