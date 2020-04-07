import React, { Component } from 'react'
import { Text, View ,StyleSheet,Button,Image,Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logo from '../images/patient.png'
import firebase from 'firebase'

export default class Patient extends Component {
    
    viewPatient = () =>
    {
        this.props.navigation.navigate('PatientDescription',{Patient:this.props.Doc,UserName:this.props.navigation.state.params.UserName})
    }

    render() {
        
        
        console.log("Patient:",this.props.Doc.DocName);
        return (
        <View style={styles.container} navigation={this.props.navigation}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={logo} style={{height:100,width:100}} />
                    
                </View>

                <View style={styles.mainInfo}>
                    <Text style={styles.name}>{this.props.Doc.Name}</Text>
                    <View style={styles.Diabetes}>
                        <Text style={styles.qualification}>{this.props.Doc.Gender}</Text>
                        <Text style={styles.qualification}>  ({this.props.Doc.Age})</Text>
                    </View>
                   
                    <Text style={styles.BP}>BP:{this.props.Doc.BP}</Text>
                    <Text style={styles.BP}>Diabetes:{this.props.Doc.Diabetes}</Text>
                    <TouchableOpacity style={styles.register}
                        onPress={this.viewPatient}
                        
                    >
                        <Text style={styles.registerText}>View</Text>
                    </TouchableOpacity>
                </View> 
               
            </View> 
           
            
        </View>
        )
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
