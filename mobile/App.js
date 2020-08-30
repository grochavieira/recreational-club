import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterEmployeeScreen from './screens/RegisterEmployeeScreen';
import ListRegistersScreen from './screens/ListRegistersScreen';
import UpdateRegistersScreen from './screens/UpdateRegistersScreen';
import RemoveRegistersScreen from './screens/RemoveRegistersScreen';
import AboutScreen from './screens/AboutScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import EditRegisterScreen from './screens/EditRegisterScreen';

let navegador = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    UpdateRegisters: {screen: UpdateRegistersScreen},
    Main: {screen: MainScreen},
    EditRegister: {screen: EditRegisterScreen},
    Register: {screen: RegisterScreen},
    RegisterEmployee: {screen: RegisterEmployeeScreen},
    ListRegisters: {screen: ListRegistersScreen},
    RemoveRegisters: {screen: RemoveRegistersScreen},
    About: {screen: AboutScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
  },
  {headerMode: 'none'},
);

let App = createAppContainer(navegador, this.props);

export default App;
