import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,FlatList, Alert } from 'react-native'
import Doctor from './Doctor'
import firebase from 'firebase'
import 'firebase/firestore'

export default class DoctorList extends Component {

    state = {
                UserName:'',
                Name:'',
                Degree:'',
                Hospital:'',
                Gender:'',
                Speciality:'',
                WorkingHours:''
    }

    DocList = []

    constructor(props){
        super(props);
        
        this.UserName=this.props.navigation.state.params.UserName
        //console.log("Patient Name:",this.UserName)
    }
    i=0
    componentDidMount(){
        db = firebase.firestore();      
        this.DocList = [];
        db.collection("Doctors").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({UserName:doc.data().UserName,Name:doc.data().Name,Degree:doc.data().Degree,Hospital:doc.data().Hospital,Speciality:doc.data().Speciality,WorkingHours:doc.data().WorkingHours,Gender:doc.data().Gender})
                
                DocObj = {
                    UserName:this.state.UserName,
                    Name:this.state.Name,
                    Degree:this.state.Degree,
                    Hospital:this.state.Hospital,
                    Speciality:this.state.Speciality,
                    WorkingHours:this.state.WorkingHours,
                    Gender:this.state.Gender
                }
            
                this.DocList.push(DocObj)
                console.log(this.state.UserName)
            });
           
        });
    }
   
   
      render() {
          console.log("UserName on DoctorList",this.UserName)
          return (
          <View style={styles.container}>
              
              {/* {this.DocList.map(
                  (item)=>{

                   console.log(item)
                      return(<Doctor Doc={item}/>)
                  }     
              )}  */}
                <FlatList
                    data={this.DocList}
                    renderItem={({ item }) => <Doctor Doc={item} UserName={this.UserName} navigation={this.props.navigation} type="register"/>}
                    keyExtractor={item => item.UserName}
                />
              
              
  
          </View>
          )
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
