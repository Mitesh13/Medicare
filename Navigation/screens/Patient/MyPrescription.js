import React, { Component } from 'react'
import { View,Alert,Text,StyleSheet,TextInput,FlatList,CheckBox } from 'react-native'
import logo from '../images/patient.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'
import Presc from '../Patient/Presc'

export default class PatientDashboard extends Component 
{
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
        firebase.firestore().collection("Patients").doc(this.patient).get().then(doc=>
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
    render()
    {
        this.patient = this.props.navigation.state.params.Patient
        console.log(this.props.navigation.state.params.Patient)
        return(
            <View style={styles.FlatListWrapper}>
                <FlatList
                    data={this.presc}
                    renderItem={({ item }) => <Presc Doc={item}  />}
                    keyExtractor={item => item.Name}
                    style={styles.widthIncrease}
                    contentContainerStyle={styles.prescription}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    FlatListWrapper:{
        flex:1,
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
})