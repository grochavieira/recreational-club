import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Card from './../components/Card';

import Header from '../components/Header';
class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header textHeader="TELA PRINCIPAL" statusBarColor="#4520E8" />

          <View style={styles.optionsContainer}>
            <Card
              iconName="person-add"
              cardText="Cadastrar Associado"
              action={() => this.props.navigation.push('Register')}
            />
            <Card
              iconName="list"
              cardText="Listar Associados"
              action={() => this.props.navigation.push('ListRegisters')}
            />
            <Card
              iconName="update"
              cardText="Atualizar Associados"
              action={() => this.props.navigation.push('UpdateRegisters')}
            />
            <Card
              iconName="remove"
              cardText="Remover Associados"
              action={() => this.props.navigation.push('RemoveRegisters')}
            />
            <Card
              iconName="info"
              cardText="Sobre"
              action={() => this.props.navigation.push('About')}
            />
          </View>
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
    backgroundColor: '#4520E8',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default LoginScreen;
