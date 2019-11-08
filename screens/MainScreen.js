import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/colors';
import CardCommunity from './../components/CardCommunity';
import Header from '../components/Header';

export default function MainScreen(props) {
  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.principalContainer}>
          <Header textHeader="Tela Principal" />

          <View style={styles.optionsContainer}>
            <CardCommunity
              iconName="account-plus"
              cardText="Cadastrar Associado"
              action={() => props.navigation.push('Register')}
            />
            <CardCommunity
              iconName="account-details"
              cardText="Listar Associados"
              action={() => props.navigation.push('ListRegisters')}
            />
            <CardCommunity
              iconName="account-edit"
              cardText="Atualizar Associados"
              action={() => props.navigation.push('UpdateRegisters')}
            />
            <CardCommunity
              iconName="account-remove"
              cardText="Remover Associados"
              action={() => props.navigation.push('RemoveRegisters')}
            />
            <CardCommunity
              iconName="information"
              cardText="Sobre"
              action={() => props.navigation.push('About')}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
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
