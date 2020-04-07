import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image ,TouchableOpacity,AsyncStorage, Alert} from 'react-native'
import GlobalStyle from '../screens/GlobalStyle'
import logo from './images/doctor.png'
import patientLogo from './images/patient.png'

export default class Home extends Component {
    
    static navigationOptions ={
        headerLeft: null,
    }

    sentToAnotherPage=false;

    constructor(props)
    {
        super(props)
        
    }

    navigateToPatientLogin = () =>
    {
        console.log('aa')
        const { navigation:navigate } = this.props;
        navigate.navigate('PatientLogin')
    }

    checkLogin = (startAsA) =>
    {
        console.log(startAsA)
        this.UserName = AsyncStorage.getItem("User").then((UserName) =>{
            
            if(UserName!==null)
            {
                console.log(UserName[0])
                if(UserName[0].localeCompare('D')==0)
                {
                    if(startAsA.localeCompare("doctor")==0)
                    {
                        this.sentToAnotherPage=true
                        console.log("To Doctor Dashboard")
                        this.props.navigation.replace('DoctorDashboard',{UserName})
                    }
                    else
                    {
                        Alert.alert("Log Out first","You're Already Logged in as a Doctor")
                    }
                }
                else if(UserName[0].localeCompare('P')==0)
                {
                    if(startAsA.localeCompare("patient")==0)
                    {
                        this.sentToAnotherPage=true
                        console.log("To Patient Dashboard")
                        this.props.navigation.replace('PatientDashBoard',{UserName})
                    }
                    else
                    {
                        Alert.alert("Log Out first","You're Already Logged in as a Patient")
                    }
                }
                
            }
            if(!this.sentToAnotherPage)
            {
                if(startAsA.localeCompare('doctor')==0)    this.props.navigation.navigate('DoctorLogin',{UserName})
                else if(startAsA.localeCompare('patient')==0)    this.props.navigation.navigate('PatientLogin',{UserName})
            }
        })
    }

    render() {
        
    
        this.UserName = null
        this.UserType = null
        
        this.UserName = AsyncStorage.getItem("User").then((UserName) =>{
            
            if(UserName!==null)
            {
                console.log(UserName)
                if(UserName[0].localeCompare('D')==0)
                {
                    console.log("To Doctor Dashboard")
                    this.props.navigation.replace('DoctorDashboard',{UserName:UserName.substring(1,UserName.length)})
                }
                else if(UserName[0].localeCompare('P')==0)
                {
                    console.log("To Patient Dashboard")
                    this.props.navigation.replace('PatientDashBoard',{UserName:UserName.substring(1,UserName.length)})
                }
            }
        })
        
        
        return (
            <View style={GlobalStyle.container}>
            
                <View style={styles.body}>
                    <Text style={styles.who}>Who are you?</Text>
                    <View style={styles.card}>
                        <TouchableOpacity
                            onPress={()=>{this.checkLogin("doctor")}}
                        >
                            <Image source={logo} style={{width:200, height:200 }} />
                        </TouchableOpacity>
                        <Text style={styles.userText}>Doctor</Text>
                    </View>
                    
                    <View style={styles.card}>
                        <TouchableOpacity
                            //onPress={this.navigateToPatientLogin}
                            onPress={()=>{this.checkLogin("patient")}}
                        >
                            <Image source={patientLogo}  style={{width:200, height:200 }}/>
                        </TouchableOpacity>
                        <Text style={styles.userText}>Patient</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        body:{
            alignItems:"center"  
        },

        card:{
            alignItems:"center"
        },
        userText:{
            color:'red',
            fontSize:20,
        },
        who:{
            color:"red",
            fontSize:30
        }
    }
)