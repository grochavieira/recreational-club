import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Colors from '../constants/colors';
class LoginScreen extends Component {
  render() {
    return (
      <LinearGradient
        colors={[Colors.primaria, Colors.secundaria]}
        style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header textHeader="Bem Vindo ao Clube Recreativo" />
          <View style={styles.loginContainer}>
            <Input nameIcon="person" textPlaceHolder="Digite seu usuário" />
            <Input
              nameIcon="lock"
              textPlaceHolder="Digite sua senha"
              security={true}
            />
          </View>
          <CustomButton
            textButton="ENTRAR"
            confirm={() => this.props.navigation.push('Main')}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  principalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cor: {
    flex: 1,
    backgroundColor: Colors.primaria,
  },
  loginContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
