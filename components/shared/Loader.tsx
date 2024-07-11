import { View, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { hp, tintColorLight } from '@/constants'

type Props = {
    loaderStyle?: ViewStyle
}

const Loader = ({ loaderStyle }: Props) => {
    return (
        <ActivityIndicator style={[styles.loader, loaderStyle]} size={"large"} color={tintColorLight} />
    )
}

export default Loader

const styles = StyleSheet.create({
    loader: {
        marginVertical: hp(6)
    }
})