import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image,Alert,AsyncStorage} from 'react-native'
import logo from '../images/patient.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'

export default class PatientDashboard extends Component {

    static navigationOptions ={
        headerLeft:null
    }
    
    logOut = ()=>{
        firebase.auth().signOut()
        .then(
            ()=>{                
                AsyncStorage.removeItem("User")
                Alert.alert('Logged Out'),
                this.props.navigation.replace('Home')
            }    
        )
        .catch((error)=> {
            console.log(error)
        });
    }
    constructor(props){
        super(props);
        
        this.UserName=this.props.navigation.state.params.UserName
        console.log("UserName on PatientDashboard:",this.UserName)
    }
    render() {
        Alert.alert('Welcome',this.UserName)
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Image style={{height:150,width:150}} source={logo} />
                    <View style={styles.Buttons}>
                        <TouchableOpacity style={styles.Button1}
                            onPress={()=>{this.props.navigation.navigate('DoctorList',{UserName:this.UserName})}}
                        >
                            <Text style={styles.ButtonText}>Find Doctor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button1}
                            onPress={()=>{this.props.navigation.navigate('MyDoctors',{UserName:this.UserName})}}
                        >
                            <Text style={styles.ButtonText}>My Doctors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button1}
                            onPress={()=>{this.props.navigation.navigate('MyPrescription',{Patient:this.UserName})}}
                        >
                            <Text style={styles.ButtonText}>My Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button1}
                            onPress={()=>{this.props.navigation.navigate('MyLabReports',{Patient:this.UserName})}}
                        >
                            <Text style={styles.ButtonText}>My Lab Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button1}>
                            <Text style={styles.ButtonText}>Update Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button1}
                            onPress={this.logOut}
                        >
                            <Text style={styles.ButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:"center"
        },

        body:{
            width:'85%',
            height:600,
           // backgroundColor:'blue',
            justifyContent:'center',
            alignItems:'center'
        },
        Buttons:{
            marginTop:20,
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
        }
})
