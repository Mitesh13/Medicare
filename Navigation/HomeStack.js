import {createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Home from './screens/Home'
import PatientSignUp from './screens/Patient/PatientSignUp'
import PatientLogin from './screens/Patient/Patientlogin'
import DoctorSignUp from './screens/Doctor/DoctorSignUp'
import DoctorLogin from './screens/Doctor/DoctorLogin'
import DoctorDashboard from './screens/Doctor/DoctorDashboard'
import PatientDashBoard from './screens/Patient/PatientDashboard'
import DoctorList from './screens/Patient/DoctorList'
import DoctorForm from './screens/Doctor/DoctorForm'
import PatientForm from './screens/Patient/PatientForm'
import PatientsList from './screens/Doctor/PatientsList'
import PatientDescription from './screens/Doctor/PatientDescription'
import Prescription from './screens/Doctor/Prescription'
import MyDoctors from './screens/Patient/MyDoctors'
import MyPrescription from './screens/Patient/MyPrescription'
import MyLabReports from './screens/Patient/MyLabReports'
import ViewDocProfile from './screens/Doctor/ViewDocProfile'
import ShowReport from './screens/Doctor/ShowReport'
import AppointmentForm from './screens/Patient/AppointmentForm'
import { AsyncStorage } from 'react-native'






const screens = {

    Home:{
        screen:Home
    },

    PatientSignUp:{
        screen:PatientSignUp

    },

    PatientLogin:{
        screen:PatientLogin
    },

    DoctorLogin:{
        screen:DoctorLogin
    },

    DoctorSignUp:{
        screen:DoctorSignUp
    },

    PatientDashBoard:{
        screen:PatientDashBoard
   },

   DoctorDashboard:{
        
       screen:DoctorDashboard
   },

   DoctorList:{
       screen:DoctorList
   },

   DoctorForm:{
       screen:DoctorForm
   },

   PatientForm:{
       screen:PatientForm
   },
   PatientsList:{
       screen:PatientsList
   },
   PatientDescription:{
       screen:PatientDescription
   },
   Prescription:{
       screen:Prescription
   },
   MyDoctors:{
       screen:MyDoctors
   },
   ViewDocProfile:{
       screen:ViewDocProfile
   },
   MyPrescription:{
       screen:MyPrescription
   },
   MyLabReports:{
       screen:MyLabReports
   },
   ShowReport:{
       screen:ShowReport
   },
   AppointmentForm:{
       screen:AppointmentForm
   }
}


const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)