import { Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { hp, wp } from '@/constants'

type Props = {}

const MobileNumberScreen = (props: Props) => {

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.title}>Enter your Phone number</Text>
            <KeyboardAvoidingView>
                <TextInput placeholder='enter your phone number' />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default MobileNumberScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(2),
        position: "relative",
        paddingTop: hp(10)

    },
    title: {
        fontSize: 50,
        fontWeight: "600",

    }
})