import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Colors from '../constants/colors';
class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header
            textHeader="BEM VINDO AO CLUBE RECREATIVO"
            statusBarColor={Colors.primaria}
          />
          <Input nameIcon="person" textPlaceHolder="Digite seu usuário" />
          <Input
            nameIcon="lock"
            textPlaceHolder="Digite sua senha"
            security={true}
          />
          <CustomButton
            textButton="ENTRAR"
            confirm={() => this.props.navigation.push('Main')}
          />
        </View>
      </View>
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
});

export default LoginScreen;
