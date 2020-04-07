import React, { Component } from 'react'
import { Text, View,StyleSheet, Alert } from 'react-native'
import firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native';

export default class Test extends Component {
    componentDidMount()
    {
        // firebase.firestore().collection('Doctors').doc('Doc1').collection('Patients').doc('patient2').get().then(function(doc) {
        //         if (doc.exists) {
        //             console.log("Document data:", doc.data().born , doc.data().first);
        //         } else {
        //             // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     }).catch(function(error) {
        //         console.log("Error getting document:", error);
        //     });

        /*firebase.firestore().collection('Doctors').doc('Doc1').get().then((querySnapshot) => {
            Alert.alert('hello')
            querySnapshot.forEach((doc) => {
               
            });
        });*/
        
    }
    p1=''
    p2=''
    setData = () =>
    {
        var i=0;
        firebase.firestore().collection('Doctors').doc(`DoctorEx${i}`).set({
            name:'Mitesh',
            spciality:'Heart',
            patients:[
                {
                    name:this.p1,
                    issue:'heart'
                },
                {
                    name:this.p2,
                    issue:'kidney'
                }
            ]
        })
    }

    getData = () =>
    {
        firebase.firestore().collection('Doctors').doc(this.p1).get().then((doc)=> {
                    if (doc.exists) {
                        //this.setState({name:doc.data().name,qualification:doc.data().qualificcation})
                        console.log(doc.data().patients[0].name);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(p) => this.p1=p} style={{borderColor:'black',borderWidth:1}}></TextInput>
                <TextInput onChangeText={(p) => this.p2=p} style={{borderColor:'black',borderWidth:1}}></TextInput>
                <Text>Heyyy</Text>
                <Button onPress={this.setData} title="Set"></Button>
                <Button onPress={this.getData} title="Get"></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container :{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
)
