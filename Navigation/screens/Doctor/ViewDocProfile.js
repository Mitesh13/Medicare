import React, { Component } from 'react'
import { Text, View ,StyleSheet,Button,Image,Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logo from '../images/patient.png'
import firebase from 'firebase'

export default class ViewDocProfile extends Component {
    
    render() {
                
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        backgroundColor:'white',
        width:300,
        padding:10,
        marginBottom:10,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row',
        elevation: 5
    },
    name:{
        color:'red',
        fontSize:20,
        fontWeight:'bold'
    },
    qualification:{
        color:'red',
        fontSize:10
    },
    register:{
        backgroundColor:'red',
        color:'white',
        textAlign:'center',
        padding:2,
        width:80

    },
    registerText:{
        color:'white',
        fontSize:15,
        textAlign:'center'
    },
    header:{
        flexDirection:'row'
    },

    mainInfo:{
        alignItems:'center',
        justifyContent:'space-around',
        flex:1
    },

    Diabetes:{
        flexDirection:'row'
    },
    BP:{
        fontSize:15,
        color:'red'
    }
})
