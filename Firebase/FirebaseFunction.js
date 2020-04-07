import React, { Component } from 'react'
import { Text, View,StyleSheet,Button } from 'react-native'
import Doctor from '../Navigation/screens/Patient/Doctor'
import firebase from 'firebase'
import 'firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'


//  var db = firebase.firestore();

//  var docRef = db.collection("Doctors");

// db.collection("Doctors").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         this.setState({name:doc.name})
//     });
// });


// store single data in state
// onClick2= ()=>{
//     var docRef = firebase.firestore().collection("Doctors").doc("doctor1");

//     docRef.get().then((doc)=> {
//         if (doc.exists) {
//             this.setState({name:doc.data().name,qualification:doc.data().qualificcation})
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch(function(error) {
//         console.log("Error getting document:", error);
//     });
//     console.log(this.state.name,this.state.qualification)
//   }

//Read
// db.collection("Doctors").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         this.setState({name:doc.name})
//     });
// });
//Add Doctor
 
// docRef.doc('doctor5').set({
//         name:'Akshay',
//         qualificcation:'MBBS'
//     })
//     .then(function(doc) {
//         console.log("Document written with ID: ");
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });


//Add Patient
//  db.collection("Doctors").doc('doctor1').collection('patient').doc('patient2').set({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

//Read
// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data().name , doc.data().qualification);
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
export default class Doctors extends Component {

  state = {
      name:'',
      qualification:''
  }
 
  onClick2= ()=>{
    var docRef = firebase.firestore().collection("Doctors").doc("doctor1");

    docRef.get().then((doc)=> {
        if (doc.exists) {
            this.setState({name:doc.data().name,qualification:doc.data().qualificcation})
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    console.log(this.state.name,this.state.qualification)
  }
 

  
    render() {
       
        return (
        <View style={styles.container}>
        
            <Button 
            title='click'
            onPress={this.onClick2}
            ></Button>

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