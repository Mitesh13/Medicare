import React, { Component } from 'react'
import { View,Alert,Text,StyleSheet,TextInput } from 'react-native'
import { Transition } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class PatientDescription extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            prescription:[]
        }
        //console.log(this.UserName=this.props.navigation.state.params.Patient)
        console.log(this.UserName=this.props.navigation.state.params.UserName)
    }
    prescription = () =>
    {
        /*console.log('Method Called')
        
        this.state.prescription.push(
            <View>
                <TextInput placeholder="Email" 
                        placeholderTextColor = "red"
                        style={styles.input}/>
            </View>
        )
        this.setState({prescription:this.state.prescription})*/
        this.props.navigation.navigate("Prescription",{Patient:this.patient,UserName:this.props.navigation.state.params.UserName})
    }

    labReport = () =>
    {
        /*console.log('Method Called')
        
        this.state.prescription.push(
            <View>
                <TextInput placeholder="Email" 
                        placeholderTextColor = "red"
                        style={styles.input}/>
            </View>
        )
        this.setState({prescription:this.state.prescription})*/
        this.props.navigation.navigate("ShowReport",{Patient:this.patient,UserName:this.props.navigation.state.params.UserName})
    }

    render() {
        //Alert.alert(this.props.navigation.state.params.Doc.UserName)
        this.patient = this.props.navigation.state.params.Patient
        console.log(this.props.navigation.state.params.Patient)
        return(
            <View style={styles.container}>
                <Text style={styles.PatName}>{this.patient.Name}</Text>
                <Text style={styles.PatName}>{this.patient.Gender}</Text>
                <Text style={styles.PatName}>{this.patient.Age}</Text>
                <TouchableOpacity style={styles.register}
                        onPress={this.prescription}
                >
                        <Text style={styles.registerText}>Prescription</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.register}
                        onPress={this.labReport}
                >
                        <Text style={styles.registerText}>Lab Report</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
        alignItems:'center',
        //backgroundColor:"green"
    },
    PatName:{
        position:'relative',
        //top:100,
        fontSize:30,
        backgroundColor:'red'
    },
    register:{
        backgroundColor:'red',
        color:'white',
        textAlign:'center',
        padding:10,
        //top:40,
    },
    registerText:{
        color:'white',
        fontSize:15,
        textAlign:'center'
    },
    input:{
        borderWidth:1,
        width:'100%',
        height:'20%',
        padding:5,
        marginBottom:5,
        borderRadius:10,
        fontWeight:'bold',
    },
});