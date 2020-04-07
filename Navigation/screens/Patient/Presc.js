import React, { Component } from 'react'
import { View,Alert,Text,StyleSheet,TextInput,FlatList,CheckBox,Divider } from 'react-native'

export default class Presc extends Component{

    constructor()
    {
        super()
        console.log("called")
    }
    render()
    {
        return(
            <View style={styles.PrescComponent}>
                {console.log("Component Called",this.props.Doc.isAfterEating)}
                <Text style={{fontWeight:'bold',}}>{this.props.Doc.Name}</Text>
                {/* <Text>{this.props.Doc.isAfterEating==true?<Text>After Eating</Text>:<Text></Text>}</Text>  */}
                {this.props.Doc.isAfterEating==true?<Text>After Eating</Text>:console.log()}
                {this.props.Doc.isBeforeEating==true?<Text>Before Eating</Text>:console.log()}
                {this.props.Doc.mrngChecked==true?<Text>Morning</Text>:console.log()}
                {this.props.Doc.noonChecked==true?<Text>Noon</Text>:console.log()}
                {this.props.Doc.evngChecked==true?<Text>Evening</Text>:console.log()}
                {this.props.Doc.nigtChecked==true?<Text>Night</Text>:console.log()}

            </View>
        )
    }
}

const styles=StyleSheet.create({
    PrescComponent:{
        alignItems:'center',
        justifyContent:'center',
        elevation:10,
        width:300,
        height:150,
        
        marginBottom:20,
        //marginTop:50,
        backgroundColor:'#FFF',
        borderRadius:10,
    },
})
