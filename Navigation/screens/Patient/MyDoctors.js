import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,FlatList, Alert } from 'react-native'
import firebase from 'firebase'
import Doctor from './Doctor'


export default class MyDoctors extends Component {

    state = {
                UserName:'',
                Name:'',
                Age:'',
                BP:'',
                Gender:'',
                Diabetes:'',
                Weight:''
    }

    DocList = []
    
    constructor(props)
    {
        super(props)
        this.setState({
            hasData:false
        })
        this.state.PatientUserName=this.props.navigation.state.params.UserName
        console.log("data copied",this.state.UserName)
        console.log("Username On DoctorList List",this.state.UserName)
    }

    componentDidMount(){
        
        //db = firebase.firestore();   
        this.DocList = [];
        Alert.alert(this.state.PatientUserName)
        console.log(this.state.UserName)
        
        firebase.firestore().collection("Doctors").where("patients","array-contains",this.state.PatientUserName).get().then((querySnapshot)=>
        {
            querySnapshot.forEach((doc)=>{    
                //this.setState({hasData:true})
                this.setState({UserName:doc.data().UserName,Name:doc.data().Name,Degree:doc.data().Degree,Hospital:doc.data().Hospital,Speciality:doc.data().Speciality,WorkingHours:doc.data().WorkingHours,Gender:doc.data().Gender})
                this.setState({hasData:true})
            
                this.DocObj = {
                    UserName:this.state.UserName,
                    Name:this.state.Name,
                    Degree:this.state.Degree,
                    Hospital:this.state.Hospital,
                    Speciality:this.state.Speciality,
                    WorkingHours:this.state.WorkingHours,
                    Gender:this.state.Gender
                }
                console.log(this.DocObj)
                this.DocList.push(this.DocObj)
                //this.setState({UserName:doc.data().UserName,Name:doc.data().Name,BP:doc.data().BP,Age:doc.data().Age,Diabetes:doc.data().Diabetes,Weight:doc.data().Weight,Gender:doc.data().Gender})
                this.setState({hasData:true})        
            })
            
        });

        
    }
   
    
    render() {
            console.log(this.state.hasData)
            if(this.state.hasData==true)
            {
                console.log(this.DocList.length)
                return (
                    
                <View style={styles.container}>
                    <FlatList
                        data={this.DocList}
                        renderItem={({ item }) => <Doctor Doc={item} UserName={this.UserName} type="view"/>}
                        keyExtractor={item => item.UserName}
                    />
                </View>
                )
            }
            else
            {
                return (
                
                    <View style={styles.container}>
                        <Text>No Doctors Assigned yet!</Text>
                    </View>
                ) 
            }
      }
  }
  
  const styles = StyleSheet.create({
      container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          width:'100%'
      }
  })
