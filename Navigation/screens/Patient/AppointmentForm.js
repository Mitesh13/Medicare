import React, { Component } from 'react'
import { Text, View ,StyleSheet,Button,Image,Alert,TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';
import logo from '../images/doctor.png'
import firebase from 'firebase'
import { setPlaneDetection } from 'expo/build/AR';

export default class Doctor extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            show:false,
            date:new Date(1598051730000),
            time:null
        }
    }
    componentDidMount()
    {
        db = firebase.firestore();  
        /*db.collection("Patients").doc(this.props.userName).get().then((doc) => 
        {
            if (doc.exists) {

                this.Name=doc.data().Name,
                this.Age=doc.data().Age,
                this.BP=doc.data().BP,
                this.Diabetes=doc.data().Diabetes,
                this.Weight=doc.data().Weight,
                this.Gender=doc.data().Gender
            } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
            
              //  Alert.alert(doc.data().Age)
                this.UserName=doc.data().UserName,
                this.Name=doc.data().Name,
                this.Age=doc.data().Age,
                this.BP=doc.data().BP,
                this.Diabetes=doc.data().Diabetes,
                this.Weight=doc.data().Weight,
                this.Gender=doc.data().Gender
            
        })*/
        
    }

    addPatient = ()=>
    {
        if(this.props.navigation.state.params.type==="register")
        {
            // db.collection("Doctors").doc(this.props.navigation.states.params.Doc.UserName).get().then((doc)=>
            // {
                
            //     if(doc.data().hasOwnProperty('patients'))
            //     {
                    
            //         //console.log("---------------------------------------------------------------------------",doc)
            //         var patientsArr = doc.data().patients
            //         console.log("patient:",this.props.navigation.states.params.UserName)
            //         console.log("patientArr:",patientsArr)
            //         if(patientsArr.includes(""+this.props.navigation.states.params.UserName)) 
            //         {
            //             Alert.alert("You're Already Registered");
            //         }
            //         else
            //         {
            //             db.collection("Doctors").doc(this.props.navigation.states.params.Doc.UserName).set({
            //                 patients:[...patientsArr,
            //                     this.props.navigation.states.params.UserName
            //                 ]
            //             },{merge:true})
            //             .then(function(docRef) {   
            //                 Alert.alert('You have been registered')
            //             })
            //             .catch(function(error) {
            //                 console.error("Error adding document: ", error);
            //             })  
            //         }     
            //     }
            //     else
            //     {
            //         console.log("UserName on Doctor.js:",this.props.navigation.states.params.UserName)
            //         db.collection("Doctors").doc(this.props.navigation.states.params.Doc.UserName).set({
            //             patients:[
            //                 this.props.navigation.states.params.UserName
            //             ]
            //         },{merge:true})
            //         .then(function(docRef) {
            //             Alert.alert('You have been registered')
            //         })
            //         .catch(function(error) {
            //             console.error("Error adding document: ", error);
            //         })
                    
            //     }
            //     db.collection("Patients").doc(this.props.navigation.states.params.UserName).get().then((doc)=>
            //     {
            //         //console.log(doc.data().Name);
            //         if(doc.data.hasOwnProperty("AssignedDoc"))
            //         {
            //             if(doc.data().AssignedDoc.includes(""+this.props.navigation.states.params.Doc.UserName)) 
            //             {
            //                 Alert.alert("You're Already Registered");
            //             }
            //             else
            //             {
            //                 db.collection("Patients").doc(this.props.navigation.states.params.UserName).set({
            //                     AssignedDoc:[...doc.data().AssignedDoc,
            //                         this.props.Doc.navigation.states.params.UserName
            //                     ]
            //                 },{merge:true})
            //             }
            //         }
            //         else
            //         {
            //             db.collection("Patients").doc(this.props.navigation.states.params.UserName).set({
            //                 AssignedDoc:[
            //                     this.props.navigation.states.params.Doc.UserName
            //                 ]
            //             },{merge:true})
            //         }
            //     })
            // })
            console.log(this.state.date.getDate())
            console.log(this.state.time.getHours())
            console.log(this.state.time.getMinutes())
            db.collection("Doctors").doc(this.props.navigation.state.params.Doc.UserName).get().then((doc)=>
            {
                
                if(doc.data().hasOwnProperty('patients'))
                {
                    
                    //console.log("---------------------------------------------------------------------------",doc)
                    var patientsArr = doc.data().patients
                    var requestsArr = doc.data().requests
                    console.log("patient:",this.props.navigation.state.params.UserName)
                    console.log("patientArr:",patientsArr)
                    if(patientsArr.includes(""+this.props.navigation.state.params.UserName)) 
                    {
                        Alert.alert("You're Already Registered");
                    }
                    else
                    {
                        if(doc.data().hasOwnProperty('requests') && requestsArr.length>0)
                        {
                            // if(requestsArr.includes(""+this.props.navigation.state.params.UserName)) 
                            // {
                            //     Alert.alert("You've Already Requested");
                            // }
                            requestsArr.filter(request=>console.log(request.name.toString()===this.props.navigation.state.params.UserName))
                            if(requestsArr.filter(request=>request.name.toString()===this.props.navigation.state.params.UserName)) 
                            {
                                Alert.alert("You've Already Requested");
                            }
                            else
                            {
                                db.collection("Doctors").doc(this.props.navigation.state.params.Doc.UserName).set({
                                    requests:[...requestsArr,
                                        {
                                            name:this.props.navigation.state.params.UserName,
                                            date:this.state.date,
                                            //time:this.state.time
                                        }
                                    ]
                                },{merge:true})
                                .then(function(docRef) {   
                                    Alert.alert('Appointment Request Sent')
                                })
                                .catch(function(error) {
                                    console.error("Error adding document: ", error);
                                })  
                            }
                        }
                        else
                        {
                            db.collection("Doctors").doc(this.props.navigation.state.params.Doc.UserName).set({
                                requests:[
                                    {
                                        name:this.props.navigation.state.params.UserName,
                                        date:this.state.date,
                                        //time:this.state.time
                                    }
                                ]
                            },{merge:true})
                            .then(function(docRef) {   
                                Alert.alert('Appointment Request Sent')
                            })
                            .catch(function(error) {
                                console.error("Error adding document: ", error);
                            })
                        }
                    }     
                }
                else
                {
                    console.log("UserName on Doctor.js:",this.props.navigation.state.params.UserName)
                    db.collection("Doctors").doc(this.props.navigation.state.params.Doc.UserName).set({
                        requests:[
                            {
                                name:this.props.navigation.state.params.UserName,
                                date:this.state.date,
                            }
                        ]
                    },{merge:true})
                    .then(function(docRef) {
                        Alert.alert('You have been registered')
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    })
                    
                }
                db.collection("Patients").doc(this.props.navigation.state.params.UserName).get().then((doc)=>
                {
                    //console.log(doc.data().Name);
                    if(doc.data.hasOwnProperty("AssignedDoc"))
                    {
                        if(doc.data().AssignedDoc.includes(""+this.props.navigation.state.params.Doc.UserName)) 
                        {
                            Alert.alert("You're Already Registered");
                        }
                        else
                        {
                            db.collection("Patients").doc(this.props.navigation.state.params.UserName).set({
                                AssignedDoc:[...doc.data().AssignedDoc,
                                    this.props.Doc.navigation.state.params.UserName
                                ]
                            },{merge:true})
                        }
                    }
                    else
                    {
                        db.collection("Patients").doc(this.props.navigation.state.params.UserName).set({
                            AssignedDoc:[
                                this.props.navigation.state.params.Doc.UserName
                            ]
                        },{merge:true})
                    }
                })
            })
        }
        else
        {
            this.props.navigation.navigate("ViewDocProfile",{UserName:this.props.navigation.state.params.Doc.Username})
        }
    }
    
    showDatePicker = () =>
    {
        this.setState({show:true,mode:'date'})
    }
    showTimePicker = () =>
    {
        this.setState({show:true,mode:'time'})
    }
    onChange = (event,selectedValue) =>
    {
        //if(this.state.mode==='date')
            this.setState({date:new Date(selectedValue),time:new Date(selectedValue)}) 
        //else
            this.setState({time:new Date(selectedValue),date:new Date(selectedValue)}) 
    }
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text>{this.props.navigation.state.params.Doc.Name}</Text>
                </View>
                <View style={styles.form}>
                    <TextInput placeholder="Disease" 
                        style={styles.input}
                        secureTextEntry={true}
                        placeholderTextColor = "red"
                        onChangeText = {(disease) => this.setState({disease})}
                    />
                    <TouchableOpacity
                        style={styles.register}
                        onPress={()=>this.showDatePicker()}
                    >
                        <Text>Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.register}
                        onPress={()=>this.showTimePicker()}
                    >
                        <Text>Time</Text>
                    </TouchableOpacity>
                    {
                        this.state.show &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                        />
                    }
                    
                    <TouchableOpacity style={styles.register}
                        onPress={this.addPatient}
                    >
                    
                    {
                        this.props.navigation.state.params.type==="register"?<Text style={styles.registerText}>Register</Text>:<Text style={styles.registerText}>View</Text>
                    }
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
        width:'85%',
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

    Speciality:{
        flexDirection:'row'
    },
    Hospital:{
        fontSize:15,
        color:'red'
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
})


