import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity ,Alert,  Image, KeyboardAvoidingView} from 'react-native'
import * as firebase from 'firebase'
import logo from '../images/logo.png'


const firebaseConfig = {
    apiKey: "AIzaSyC1I-wRFNt8kOWRBx3sr5_LFIT0VQKBUuo",
    authDomain: "signup-83c87.firebaseapp.com",
    databaseURL: "https://signup-83c87.firebaseio.com",
    projectId: "signup-83c87",
    storageBucket: "signup-83c87.appspot.com",
    messagingSenderId: "760008790033",
    appId: "1:760008790033:web:323e34a863b794ceef61b0",
    measurementId: "G-3WF5VY3PEJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
    }

    signUpUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            Alert.alert(
                'Signed Up Successfully'
             )
        }).catch((error)=>{
            Alert.alert(error.message)
        })
    }

    loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            Alert.alert(
                'Logged In Successfully'
             )
        }).catch((error)=>{
            Alert.alert(error.message)
        })
    }

    render() {
        return ( 
            <KeyboardAvoidingView enabled behavior="padding"  style={styles.container}>
                
                
                <Image source={logo} style={{height:150,width:150}}/>

                <View style={styles.Inputs}>
                    <TextInput placeholder="Email" 
                    placeholderTextColor = "red"
                    onChangeText = {(email) => this.setState({ email })}
                    style={styles.input}/>

                <TextInput placeholder="Password" 
                    style={styles.input}
                    secureTextEntry={true}
                    placeholderTextColor = "red"
                    onChangeText = {(password) => this.setState({password})}
                    />
                </View>
                
                <View  style={styles.Buttons}>
                    <TouchableOpacity 
                    style={styles.Login}
                    onPress = {() => this.loginUser(this.state.email.trim(), this.state.password) }>
                        <Text style={styles.Field1}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.SignUp}
                    onPress = {() => this.signUpUser(this.state.email.trim(), this.state.password)}
                    >
                        <Text style={styles.Field2
                        }>Sign Up</Text>
                    </TouchableOpacity>
                </View>
    
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop:80,
        alignItems:'center'
    },
    Inputs:{
       width:'70%',
       height:100,
       justifyContent:'center',
    },
    input:{
        borderWidth:1,
        width:'100%',
        padding:5,
        marginBottom:5,
        borderRadius:10,
        fontWeight:'bold',
    },

    Buttons:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'70%'
    },
    Login:{
        backgroundColor:'red',
        padding:10,
        width:100,
        color:'white',
        borderRadius:10
        
    },

    SignUp:{
        borderWidth:1,
        padding:10,
        width:100,
        color:'white',
        borderRadius:10
    },

    Field1:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20
    },
    Field2:{
        color:'red',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20

    }

})