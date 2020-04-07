import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,FlatList, Alert } from 'react-native'
import firebase from 'firebase'

import Patient from './Patient'

export default class PatientsList extends Component {

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
        this.state.UserName=this.props.navigation.state.params.UserName
        console.log("data copied",this.state.UserName)
        console.log("Username On Patient List",this.state.UserName)
    }

    componentDidMount(){
        
        //db = firebase.firestore();   
        this.DocList = [];
        Alert.alert(this.state.UserName)
        console.log(this.state.UserName)
        
        firebase.firestore().collection("Doctors").doc(this.state.UserName).get().then((doc)=>
        {
            //console.log(doc.data())
            //console.log("inside then")
            //console.log(doc.data());  
            /*
                snapshot.forEach(doc => {
                  const data = doc.data();
                  console.log(data);
                });
              */
            if(doc.data()!=null && doc.data().hasOwnProperty('patients'))
            {
                //this.setState({hasData:true})
                console.log("Has Patients")
                var patientsArr = doc.data().patients
                if(patientsArr.length<1)
                {
                    this.setState({hasData:false})
                }
                else
                {
                    this.setState({hasData:true})
                    for(let i=0;i<patientsArr.length;i++)
                    {
                        firebase.firestore().collection("Patients").doc(patientsArr[i]).get().then((doc) => {
                            
                            
                            this.DocObj = {
                                
                                UserName:doc.data().UserName,
                                Name:doc.data().Name,
                                Age:doc.data().Age,
                                BP:doc.data().BP,
                                Diabetes:doc.data().Diabetes,
                                Weight:doc.data().Weight,
                                Gender:doc.data().Gender
                            }
                            console.log(this.DocObj)
                            this.DocList.push(this.DocObj)
                            this.setState({UserName:doc.data().UserName,Name:doc.data().Name,BP:doc.data().BP,Age:doc.data().Age,Diabetes:doc.data().Diabetes,Weight:doc.data().Weight,Gender:doc.data().Gender})
                        })
                    }
                }
                    
                
            }
            else
            {
                this.setState({hasData:false})
                console.log("no Patients")
                
            }
           
           
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
                            renderItem={({ item }) => <Patient Doc={item}  navigation={this.props.navigation}/>}
                            keyExtractor={item => item.Name}
                    />
                </View>
                )
            }
            else
            {
                return (
                
                    <View style={styles.container}>
                        <Text>No Patients yet!</Text>
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
