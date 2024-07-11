import { Loader } from '@/components'
import { hp, tintColorLight, wp } from '@/constants'
import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const SplashScreen = () => {
    const [loading, setloading] = useState<boolean>(true);
    const [isDataLoaded, setisDataLoaded] = useState(false)

    // final useEffect to run api call to load data
    useEffect(() => {
        setTimeout(() => {
            return setloading(false)
        }, 2000)
    }, [])
    return (
        <View style={styles.contaner}>
            <Image style={styles.logo} source={require("../assets/images/icon.png")} alt='logo' />
            {
                loading ? (<Loader loaderStyle={{ marginVertical: hp(4) }} />) : (
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