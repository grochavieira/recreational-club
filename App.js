import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
import ListRegistersScreen from './screens/ListRegistersScreen';
import UpdateRegistersScreen from './screens/UpdateRegistersScreen';
import RemoveRegistersScreen from './screens/RemoveRegistersScreen';
import AboutScreen from './screens/AboutScreen';

import {createAppContainer} from 'react-navigation'; //o próprio navegador
import {createStackNavigator} from 'react-navigation-stack'; //empacota o navegador

//o primeiro parâmetro mapeia um link para as paginas
let navegador = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Main: {screen: MainScreen},
    Register: {screen: RegisterScreen},
    ListRegisters: {screen: ListRegistersScreen},
    UpdateRegisters: {screen: UpdateRegistersScreen},
    RemoveRegisters: {screen: RemoveRegistersScreen},
    About: {screen: AboutScreen},
  },
  {headerMode: 'none'},
);

let App = createAppContainer(navegador);

export default App;
