import React, { Component } from 'react'
import { Text, View , StyleSheet} from 'react-native'
//import Signup from './SignUp/SignUp'
// //import Doctor from './SignUp/Doctor'
import HomeStack from './Navigation/HomeStack'
import DoctorLogin from './Navigation/screens/Doctor/DoctorLogin'
import PatientForm from './Navigation/screens/Patient/PatientForm'
import DoctorList from './Navigation/screens/Patient/DoctorList'
import PatientDashboard from './Navigation/screens/Patient/PatientDashboard'
// import DoctorList from './Navigation/screens/Doctor/DoctorList'
// import SignUp from './Navigation/screens/SignUp'
// import PatientDashboard from './Navigation/screens/DashBoard/PatientDahsboard'
//import Home from './Navigation/screens/Home'
import Patientlogin from './Navigation/screens/Patient/Patientlogin'
// import DOctorFrom from './Navigation/screens/Doctor/DoctorForm'
// import DoctorList from './Navigation/screens/Patient/DoctorList'
import Test from './Navigation/Test'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {
  render() {
    console.disableYellowBox = true; 
    return (
        <HomeStack />
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
