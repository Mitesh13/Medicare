import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Doctor = () => {
    return (
        <View style={StyleSheet.container}>
            <Text>Doctor</Text>
        </View>
    )
}

export default Doctor

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:'center',
            alignItems: 'center',
        }
    }
)