import React, { Component } from 'react'
import { Text, View, StyleSheet,TextInput,TouchableOpacity, Alert } from 'react-native'
import '../GlobalStyle'
import GlobalStyle from '../GlobalStyle'
import firebase from 'firebase'



export default class DoctorForm extends Component {
    constructor(props){
        super(props);
        
        this.state.UserName=this.props.navigation.state.params.UserName
    }
    state={
        UserName:'',
        FullName:'',
        Gender:'',
        Degree:'',
        Speciality:'',
        Hospital:'',
        WorkingHours:''
    }
    
    clickMe = ()=>{
        var docRef = firebase.firestore().collection("Doctors").doc(this.state.UserName);
        docRef.set({
                    UserName:this.state.UserName,
                    Name:this.state.FullName,
                    Gender:this.state.Gender,
                    Degree:this.state.Degree,
                    Speciality:this.state.Speciality,
                    Hospital:this.state.Hospital,
                    WorkingHours:this.state.WorkingHours
                })
                .then(()=> {
                    console.log("Document written with ID: ",this.state.UserName);
                    this.props.navigation.navigate('DoctorDashboard',{UserName:this.state.UserName})
                    Alert.alert('Data added')
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
           
           // userName=this.state.UserName
            
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={GlobalStyle.Inputs}>
                    {/* <TextInput placeholder="User Name" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(UserName)=>{this.setState({UserName})}}
                    /> */}
                    <TextInput placeholder="Full Name" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(FullName)=>{this.setState({FullName})}}
                    />
                    <TextInput placeholder="Gender" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Gender)=>{this.setState({Gender})}}
                    />
                    <TextInput placeholder="Degree" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Degree)=>{this.setState({Degree})}}
                    />
                    <TextInput placeholder="Speciality" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Speciality)=>{this.setState({Speciality})}}
                    />
                    <TextInput placeholder="Hospital" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Hospital)=>{this.setState({Hospital})}}
                    />
                    <TextInput placeholder="Working hours" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(WorkingHours)=>{this.setState({WorkingHours})}}
                    />
                    <TouchableOpacity 
                    onPress={this.clickMe}
                    style={styles.Login}>
                        <Text style={styles.Field1}>Login</Text>
                    </TouchableOpacity>
                    
                </View>
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        Login:{
            backgroundColor:'red',
            padding:10,
            width:100,
            color:'white',
            borderRadius:10
            
        },
    
        container:{
            justifyContent:'center',
            alignItems:"center",
            marginTop:180
        },
    
        Field1:{
            color:'white',
            textAlign:'center',
            fontWeight:'bold',
            fontSize:20
        },
    }
)
