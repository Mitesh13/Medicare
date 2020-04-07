import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'

const GlobalStyle = StyleSheet.create(
    {
        container:{
            justifyContent:"center",
            alignItems:'center',
            flex:1
        },

        Buttons:{
            marginTop:20,
            backgroundColor:'white',
            width:'80%',
            height:300,
            flexDirection:'column',
            justifyContent:'space-around'
        },
        Button1:{
            backgroundColor:'red',
            textAlign:'center',     
        },
        ButtonText:{
            color:'white',
            fontSize:20,
            padding:5
        },
        Inputs:{
            width:'70%',
            height:100,
            justifyContent:'center',
            alignItems:'center'
         },
     
         Buttons:{
             flexDirection:'row',
             justifyContent:'space-around',
             width:'70%'
         },
         input:{
            borderWidth:1,
            width:'100%',
            padding:5,
            marginBottom:5,
            borderRadius:10,
            fontWeight:'bold',
        },
     
    }
)

export default GlobalStyle