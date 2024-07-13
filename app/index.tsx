import { Loader } from '@/components'
import { hp, tintColorLight, wp } from '@/constants'
import { fetchAlldata } from '@/redux/reducers/main.reducers'
import { RootState } from '@/redux/store'
import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'

const SplashScreen = () => {
    const dispatch = useDispatch()
    const { isloading, banners } = useSelector((state: RootState) => state.main)

    // final useEffect to run api call to load data
    useEffect(() => {

        if (!banners.length) {
            dispatch(fetchAlldata())
        }

        return () => { }

    }, [])
    return (
        <View style={styles.contaner}>


            <Image style={styles.logo} source={require("../assets/images/icon.png")} alt='logo' />
            {
                isloading ? (<Loader loaderStyle={{ marginVertical: hp(4) }} />) : (
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