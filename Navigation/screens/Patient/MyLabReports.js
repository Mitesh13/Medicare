import React, { Component } from 'react'
import { View,Alert,Text,StyleSheet,TextInput,FlatList,CheckBox,Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'


// class DispImages extends Component
// {
//     render()
//     {
//         return(
//             <Image source={{uri:this.props.Image}} style={{width:50,height:50}}/>
//         )
//     }    
// }

export default class MyLabReports extends Component 
{
    
    state = {
        image: null,
        loading:false,
    };

    constructor()
    {
        super()
        this.ref = firebase.storage().ref().child('images/p8@p.com'/*+this.patient*/)
        
        //console.log(ref.get())
    }
    onChooseImage = async() =>
    {
        console.log(this.state.loading)
        console.log('ChooseImage called')
        var storage = firebase.storage();

        // this.setState({loading:true},()=>{
        //     this.ref.listAll().then((res)=>{
        //         console.log(res)
        //         res.prefixes.forEach(folderRef=>{
        //             console.log("prefixessssssssss:",folderRef)
        //         })
        //         res.items.forEach((itemRef) => {
        //             console.log("items:",itemRef.toString())
        //             itemRef.getDownloadURL().then((url)=>{
        //                 console.log(url)
        //                 this.Images.push(url)
        //                 this.setState({gotUrl:true})
        //             })
        //         });
        //         this.setState({
        //             loading: false
        //         })
                
        //     }).catch(function(error) {
        //         console.log("error:",error)
        //     });
        // })
        

        await ImagePicker.getCameraPermissionsAsync().then(async(PermissionResponse)=>{
            if(PermissionResponse.status.toString().localeCompare('granted')!==0)
            {
                //console.log(PermissionResponse.status.toString().localeCompare('granted'))
                console.log("permission is not granted"+PermissionResponse.status)
                await ImagePicker.requestCameraPermissionsAsync().then(()=>{        
                }).catch(()=>{Alert.alert("no camera access")})
            }
            else
            {
                console.log("permission is granted")
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1
                })
                console.log(result)
                console.log(result.uri)
                this.setState({image:result.uri})
                console.log("image",this.state.image)
            }
        }).catch((exception)=>{
            console.log("exception:"+exception)
        })
        
        /*let result = await ImagePicker.launchCameraAsync()
            //let result = await ImagePicker.launchImageLibraryAsync()
        
            

            if(!result.cancelled)
            {
                this.uploadImage(result.uri,'test-image')
                .then(()=>{
                    Alert.alert('Image Uploaded')
                })
                .catch(()=>{
                    Alert.alert('Cancelled')
                })
            }*/
        
        
    }

    uploadImage = async (uri,imageName) =>
    {
        const response = await fetch(uri)
        const blob = await response.blob()
        
        var ref = firebase.storage().ref().child('images/'+this.patient+'/'+imageName)
        //console.log(ref.get())
        return ref.put(blob)
    }
/*service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
} */
    render()
    {
        let { image } = this.state;
        let {loading} = this.state
        this.patient = this.props.navigation.state.params.Patient
        //console.log(this.patient)
        return (

            <View style={styles.container}>
                
                
                
                {
                    this.state.image 
                    && 
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: this.state.image }} style={styles.image}/> 
                    </View>
                    
                }
                {
                    this.state.image 
                    &&
                    <TouchableOpacity
                    style={styles.Button1}
                    onPress={()=>this.uploadImage(this.state.image,this.patient).then(()=>{
                        Alert.alert("Successfully Uploaded")
                        this.setState({image:null})
                    }).catch(()=>{Alert.alert("couldn't upload Image")})}
                    ><Text style={styles.ButtonText}>Upload</Text>
                </TouchableOpacity>
                }
                {
                    !this.state.image 
                    && 
                    <TouchableOpacity
                        style={styles.Button1}
                        onPress={this.onChooseImage}
                    >
                        <Text style={styles.ButtonText}>Upload Report</Text>
                    </TouchableOpacity>
                        
                }
                {
                    
                    this.state.loading
                    &&
                    <Text>Loading</Text>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'green'
    },
    imageWrapper:{
        height:'90%',
        width:'100%',
        backgroundColor:'red',
    },
    image:{
        width: '100%', 
        height: '100%',
    },
    Button1:{
        width:'100%',
        
        backgroundColor:'red',
        textAlign:'center',  
        
    },
    ButtonText:{
        color:'white',
        fontSize:20,
        padding:5
    }
})

