import React, { Component } from 'react'
import { View,Alert,Text,StyleSheet,TextInput,FlatList,Image,ScrollView } from 'react-native'
import { Transition } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'

class DispImages extends Component
{
    render()
    {
        return(
            <Image source={{uri:this.props.Image}} style={{width:'100%',height:'100%',paddingBottom:10,flex:1}}/>
        )
    }    
}

export default class ShowReport extends Component{
    Images = []
    state={
        gotUrl:false
    }
    constructor()
    {
        super()
    }
    componentDidMount()
    {
        this.ref = firebase.storage().ref().child('images/'+this.props.navigation.state.params.Patient.UserName)
        
        console.log('images/'+this.props.navigation.state.params.Patient.UserName)
        this.setState({loading:true},()=>{
            this.ref.listAll().then((res)=>{
                console.log(res)
                res.prefixes.forEach(folderRef=>{
                    console.log("prefixessssssssss:",folderRef)
                })
                res.items.forEach((itemRef) => {
                    console.log("items:",itemRef.toString())
                    itemRef.getDownloadURL().then((url)=>{
                        console.log(url)
                        this.Images.push(url)
                        this.setState({gotUrl:true})
                    })
                });
                this.setState({
                    loading: false
                })
                
            }).catch(function(error) {
                console.log("error:",error)
            });
        })
    }

    render() {
        //Alert.alert(this.props.navigation.state.params.Doc.UserName)
        this.patient = this.props.navigation.state.params.Patient
        
        return(
            <View style={styles.container}>
                {
                    this.state.gotUrl
                    &&
                    <FlatList
                        data={this.Images}
                        contentContainerStyle={{flex:1,backgroundColor:'green'}}
                        renderItem={({ item }) => <DispImages Image={item} />}
                        keyExtractor={item => item.UserName}
                    />
                }      
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
        //alignItems:'center',
        backgroundColor:"red"
    },
});