import { Colors, hp, tintColorLight, wp } from '@/constants'
import { fetchUserProfile } from '@/redux/reducers/auth.reducer'
import { fetchAlldata } from '@/redux/reducers/main.reducers'
import { RootState } from '@/redux/store'
import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const SplashScreen = () => {
    const dispatch = useDispatch()
    const { isloading, orders, isError } = useSelector((state: RootState) => state.main)
    const { authToken, authState } = useSelector((state: RootState) => state.auth)

    // final useEffect to run api call to load data
    useEffect(() => {


        if (authState) {
            dispatch(fetchAlldata() as any)
            dispatch(fetchUserProfile({ token: authToken }) as any)
        }

        return () => { }
    }, [])
    return (
        <View style={styles.contaner}>


            <Image style={styles.logo} source={require("../assets/images/icon.png")} alt='logo' />
            {
                isloading ? (<View className='mt-2'>
                    <ActivityIndicator size={"large"} color={Colors.Primary} /></View>) : isError ? (
                        <></>
                    ) : (
                    <Redirect href={`/(auth)/`} />
                )
            }
            <View style={styles.brandingContainer}>
                <Text style={styles.bandText}>Designed & Developed by <Text style={styles.brandName}>XecureCode</Text> </Text>
            </View>
        </View>
    )
}

export default SplashScreen


const styles = StyleSheet.create({
    contaner: {
        height: hp(100),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    logo: {
        width: wp(30),
        height: hp(15),
        borderRadius: 8,
    },
    brandingContainer: {
        width: wp(90),
        padding: 8,
        position: "absolute",
        bottom: hp(5),
        alignItems: "center"
    },
    bandText: {
        fontSize: wp(3.8),
        fontWeight: "600",
        alignItems: "center",
    },
    brandName: {
        color: tintColorLight
    }


})