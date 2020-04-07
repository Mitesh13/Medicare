import React, { Component } from 'react'
import { Text, View ,TextInput,Switch,TouchableOpacity,StyleSheet} from 'react-native'
import GlobalStyle from '../GlobalStyle'
import firebase from 'firebase'

export default class PatientForm extends Component {
    state={
        UserName:'',
        FullName:'',
        Gender:'',
        Age:'',
        Diabetes:'',
        BP:'',
        Weight:'',
        Height:''
    }

    constructor(props){
        super(props);
        
        //this.userName=this.props.navigation.state.params.userName
        this.state.UserName=this.props.navigation.state.params.UserName
        //console.log("constructor called!", this.state.u)
    }

    clickMe = () =>{
        
        var docRef = firebase.firestore().collection("Patients").doc(this.state.UserName);
        docRef.set({
                    //UserName:this.state.UserName,
                    UserName:this.state.UserName, //-------------------------------------------------code changed-----------------
                    Name:this.state.FullName,
                    Gender:this.state.Gender,
                    Age:this.state.Age,
                    Diabetes:this.state.Diabetes,
                    BP:this.state.BP,
                    Weight:this.state.Weight,
                    Height:this.state.Height
                })
                .then(()=> {
                  //  var userName=email
                    this.props.navigation.navigate('PatientDashBoard',{UserName:this.state.UserName})
                    console.log("Document written with ID: ",this.state.UserName);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            //Alert.alert('Data added')
                /*()=>{
                    var userName=email
                    this.props.navigation.navigate('PatientDashBoard',{userName})
                }*/
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={GlobalStyle.Inputs}>

                    {/*<TextInput placeholder="User Name" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(UserName)=>{this.setState({UserName})}}/> 
                    */}
                    
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
                    <TextInput placeholder="Age" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Age)=>{this.setState({Age})}}
                    />
                    <TextInput placeholder="Diabetes" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Diabetes)=>{this.setState({Diabetes})}}
                    />
                    <TextInput placeholder="Blood Pressure" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(BP)=>{this.setState({BP})}}
                    />
                    <TextInput placeholder="Weight" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Weight)=>{this.setState({Weight})}}
                    />
                    <TextInput placeholder="Height" 
                        placeholderTextColor = "red"
                        style={GlobalStyle.input}
                        onChangeText = {(Height)=>{this.setState({Height})}}
                    />
                    <TouchableOpacity 
                    onPress={this.clickMe}
                    style={styles.Login}>
                        <Text style={styles.Field1}>Submit</Text>
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