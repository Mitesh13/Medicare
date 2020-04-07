import React,{ Component } from 'react'
import { Text, View ,StyleSheet,Image,Alert, AsyncStorage} from 'react-native'
import logo from '../images/doctor.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'
import { StackActions } from '@react-navigation/native';

export default class DoctorDashboard extends Component {

    

    constructor(props){
        super(props);
        
        this.UserName=this.props.navigation.state.params.UserName
    }
    
    static navigationOptions ={
        headerLeft:()=>null
    }

    componentDidMount = async() =>
    {

        
        let user = AsyncStorage.getItem("User").then((a) =>{
            console.log("lol",a)
        })
        
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

    Patients = ()=>{
      //Alert.alert(this.userName)
      console.log("UserName on DoctorDashboard",this.UserName)
        this.props.navigation.navigate('PatientsList',{UserName:this.UserName})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Image style={{height:150,width:150}} source={logo} />
                    <View style={styles.Buttons}>
                        <TouchableOpacity style={styles.Button1}
                            onPress={this.Patients}
                        >
                            <Text style={styles.ButtonText}>My Patient</Text>
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

const styles= StyleSheet.create(
    {
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
           // justifyContent:'space-around'
        },
        Button1:{
            backgroundColor:'red',
            textAlign:'center',  
            marginBottom:15,
        },
        ButtonText:{
            color:'white',
            fontSize:20,
            padding:5
        }
    }
)
