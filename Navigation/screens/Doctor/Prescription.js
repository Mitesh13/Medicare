import React, { Component } from 'react'
import { View,Alert,Text,StyleSheet,TextInput,FlatList,CheckBox } from 'react-native'
import { Transition } from 'react-native-reanimated'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import firebase from 'firebase'
import Presc from '../Patient/Presc'


export default class Prescription extends Component{
    presc = []

    constructor()
    {
        super()
        this.state={
            Name:'',
            mrngChecked:false,
            noonChecked:false,
            evngChecked:false,
            nigtChecked:false,
            isAfterEating:false,
            isBeforeEating:false
        }
        console.log("Cons Called")
    }

    componentDidMount()
    {
        console.log("called mounted")
        firebase.firestore().collection("Patients").doc(this.patient.UserName).get().then(doc=>
            {
                console.log("data found")
                if(doc.data().hasOwnProperty("Prescription"))
                {
                    console.log("Presc found",doc.data().Prescription.length)
                    
                    for(var i=0;i<doc.data().Prescription.length;i++)
                    {
                        
                        this.obj={
                            Name:doc.data().Prescription[i].Name,
                            isBeforeEating:doc.data().Prescription[i].BeforeEating,
                            isAfterEating:doc.data().Prescription[i].AfterEating,
                            mrngChecked:doc.data().Prescription[i].Morning,
                            evngChecked:doc.data().Prescription[i].Evening,
                            noonChecked:doc.data().Prescription[i].Noon,
                            nigtChecked:doc.data().Prescription[i].Night
                        }
                        this.presc.push(this.obj)     
                    }
                    console.log("Obj Pushed",this.presc)
                    console.log(this.presc.length)
                    this.setState({UserName:doc.data().UserName,Name:doc.data().Name,BP:doc.data().BP,Age:doc.data().Age,Diabetes:doc.data().Diabetes,Weight:doc.data().Weight,Gender:doc.data().Gender})                       
                }
                else    
                {                    
                    return (<Text>No Prescription Yet!</Text>)
                }
            }
        ).catch(exception=>{
            return (<Text>No Prescription Yet!</Text>)
        })   
    }

    addPrescription = () =>
    {
        firebase.firestore().collection("Patients").doc(this.patient.UserName).get().then(doc=>
            {
                if(doc.data().hasOwnProperty("Prescription"))
                {
                    //console.log("document:",firebase.firestore().collection("Patients").doc(this.patient.UserName).data())
                    //console.log("data:",doc.data())
                    firebase.firestore().collection("Patients").doc(this.patient.UserName).set({
                        Prescription:[...doc.data().Prescription,{Name:this.state.Name,Morning:this.state.mrngChecked,Night:this.state.nigtChecked,Evening:this.state.evngChecked,Noon:this.state.noonChecked,BeforeEating:this.state.isBeforeEating,AfterEating:this.state.isAfterEating}]
                    },{merge:true}).then(()=>{
                        Alert.alert("Prescription Added")
                        this.setState({
                            Name:'',
                            mrngChecked:false,
                            noonChecked:false,
                            evngChecked:false,
                            nigtChecked:false,
                            isAfterEating:false,
                            isBeforeEating:false
                        })
                    }).catch(()=>{Alert.alert("Invalid Data")})
                }
                else    
                {              
                        
                   
                    firebase.firestore().collection("Patients").doc(this.patient.UserName).set({
                        Prescription:[{Name:this.state.Name,Morning:this.state.mrngChecked,Night:this.state.nigtChecked,Evening:this.state.evngChecked,Noon:this.state.noonChecked,BeforeEating:this.state.isBeforeEating,AfterEating:this.state.isAfterEating}]
                    },{merge:true})
                    .then(()=>{
                        Alert.alert("Prescription Added")
                        this.setState({
                            Name:'',
                            mrngChecked:false,
                            noonChecked:false,
                            evngChecked:false,
                            nigtChecked:false,
                            isAfterEating:false,
                            isBeforeEating:false
                        })
                        this.setState()
                    }).catch(()=>{Alert.alert("Invalid Data")})
                    // firebase.firestore().collection("Patients").doc(this.patient.UserName).set({
                    //     Prescription:[{Name:this.state.Name,Time:this.state.Time}]
                    // },{merge:true})
                }
            }
        )
        
    }

    setMorning = () => this.setState({mrngChecked:!this.state.mrngChecked})
    setAfterEating = () => this.setState({isAfterEating:!this.state.isAfterEating})
    setBeforeEating = () => this.setState({isBeforeEating:!this.state.isBeforeEating})
    
    setNoon = () =>
    {
        this.setState({
            noonChecked:!this.state.noonChecked
        })
    }
    setEvening = () =>
    {
        this.setState({
            evngChecked:!this.state.evngChecked
        })
    }
    setNight = () =>
    {
        this.setState({
            nigtChecked:!this.state.nigtChecked
        })
    }
    render() {
        //Alert.alert(this.props.navigation.state.params.Doc.UserName)
        this.patient = this.props.navigation.state.params.Patient
        //console.log(this.props.navigation.state.params.Patient)
        return(
            <View style={styles.container}>
                
                <View style={styles.FlatListWrapper}>
                    <FlatList
                            data={this.presc}
                            renderItem={({ item }) => <Presc Doc={item}  />}
                            keyExtractor={item => item.Name}
                            style={styles.widthIncrease}
                            contentContainerStyle={styles.prescription}
                    />
                </View>
                
                <View style={styles.prescriptions}>
                    <TextInput
                        placeholder="Medicine Name"
                        style={styles.input}
                        onChangeText = {(Name)=>this.setState({Name})}
                    />
                
                    {/* <TextInput
                        placeholder="Time"
                        style={styles.input}
                        onChangeText = {(Time)=>this.setState({Time})}
                    /> */}
                    <View style={styles.timings}>
                        <View style={styles.timing}>
                            <CheckBox value={this.state.mrngChecked} onChange={this.setMorning}>
                            </CheckBox>
                            <Text>Morning</Text>
                        </View>
                        <View style={styles.timing}>
                            <CheckBox value={this.state.noonChecked} onChange={this.setNoon}>
                            </CheckBox>
                            <Text>Noon</Text>
                        </View>
                        <View style={styles.timing}>
                            <CheckBox value={this.state.evngChecked} onChange={this.setEvening}>
                            </CheckBox>
                            <Text>Evening</Text>
                        </View>
                        <View style={styles.timing}>
                            <CheckBox value={this.state.nigtChecked} onChange={this.setNight}>
                            </CheckBox>
                            <Text>Night</Text>
                        </View>
                    </View>
                    
                    <View style={styles.separator}></View>

                    <View style={styles.timings}>
                        <View style={styles.timing}>
                            <CheckBox value={this.state.isAfterEating} onChange={this.setAfterEating}>
                            </CheckBox>
                            <Text>After Eating</Text>
                        </View>
                        <View style={styles.timing}>
                            <CheckBox value={this.state.isBeforeEating} onChange={this.setBeforeEating}>
                            </CheckBox>
                            <Text>Before Eating</Text>
                        </View>
                        
                    </View>
                    <TouchableOpacity style={styles.register}
                        onPress={this.addPrescription}
                        
                    >
                        <Text style={styles.registerText}>Add</Text>
                    </TouchableOpacity>
                </View>       
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
    prescriptions:{
        //position:"relative",
        overflow:"hidden",
        flex:0.35,
        justifyContent:"flex-end",
        alignSelf: 'flex-start',
        width:'100%',
        
    },
    
    input:{
        
        borderWidth:1,
        width:'100%',
        padding:5,
        marginBottom:5,
        borderRadius:10,
        fontWeight:'bold',
    },
    List:{
        position:"relative",
        top:0
    },
    timing:{
        flexDirection:'column'
    },
    timings:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    separator:{
        width:'100%',
        borderBottomWidth:1,
        
        paddingBottom:10
    },
    FlatListWrapper:{
        flex:0.65,
        borderWidth:1,
        
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    prescription:{
        width:'100%',
        
        justifyContent:"center",
        alignItems:"center",
        
       
    },
    PrescComponent:{
        alignItems:'center',
        justifyContent:'center',
        elevation:10,
        width:200,
        height:150,
        
        marginBottom:20,
        //marginTop:50,
        backgroundColor:'#FFF',
        
    },
    widthIncrease:{
        width:'100%',

    }
});