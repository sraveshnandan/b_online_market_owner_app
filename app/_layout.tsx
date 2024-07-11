import React from 'react'
import { Stack } from 'expo-router'

export default function Mainlayout() {
    return (
        <Stack screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name='index' />
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='splash' />
        </Stack>
    )
}