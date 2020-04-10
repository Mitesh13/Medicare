import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,FlatList, Alert } from 'react-native'
import firebase from 'firebase'

import Patient from './Patient'

export default class PatientsList extends Component {

    state = {
                Doc : [] // badha array chhelle state ma mukva j padse
    }

    DocList = []
    
    constructor(props)
    {
        super(props)
        this.setState({
            hasData:false
        })
        this.state.UserName=this.props.navigation.state.params.UserName
       
    }

    componentDidMount(){
        
        
        this.DocList = [];
        Alert.alert(this.state.UserName)
       
        
        firebase.firestore().collection("Doctors").doc(this.state.UserName).onSnapshot((doc)=> // snapshot thi realtime updates aave
        {
           
            if(doc.data()!=null && doc.data().hasOwnProperty('patients'))
            {
                
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
                         
                            this.DocList.push(this.DocObj)
                         
                          this.setState({Doc:this.DocList})
                          
                        })
                        
                    }
                    this.DocList = [] // ahiya array clear karyo
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
  
            if(this.state.hasData==true)
            {
              
                return (
                    
                <View style={styles.container}>
                    <FlatList
                            data={this.state.Doc}
                            renderItem={({ item }) => <Patient Doc={item}  navigation={this.props.navigation}/>}
                            keyExtractor={item => item.Name}
                            refreshing={true}
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
