import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Card from './../components/Card';
import CardCommunity from './../components/CardCommunity';

import Header from '../components/Header';
class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header textHeader="TELA PRINCIPAL" statusBarColor="#4520E8" />

          <View style={styles.optionsContainer}>
            <CardCommunity
              iconName="account-plus"
              cardText="Cadastrar Associado"
              action={() => this.props.navigation.push('Register')}
            />
            <CardCommunity
              iconName="account-details"
              cardText="Listar Associados"
              action={() => this.props.navigation.push('ListRegisters')}
            />
            <CardCommunity
              iconName="account-edit"
              cardText="Atualizar Associados"
              action={() => this.props.navigation.push('UpdateRegisters')}
            />
            <CardCommunity
              iconName="account-remove"
              cardText="Remover Associados"
              action={() => this.props.navigation.push('RemoveRegisters')}
            />
            <CardCommunity
              iconName="information"
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
    width: '75%',
    justifyContent: 'center',
  },
});

export default LoginScreen;
