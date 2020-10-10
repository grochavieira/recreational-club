import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';

import Colors from '../constants/colors';
import Header from '../components/Header';

export default function AboutScreen() {
  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.principalContainer}>
          <Header textHeader="Sobre" />
          <View style={styles.aboutContainer}>
            <View style={styles.aboutHeader}>
              <IconAwesome name="info" size={24} color={Colors.primaria} />
              <Text style={styles.aboutHeaderText}>INFORMAÇÕES</Text>
            </View>
            <View style={styles.aboutFooter}>
              <Text style={styles.aboutFooterText}>Versão v1.00</Text>
            </View>
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
  },
  aboutContainer: {
    width: '80%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 4,
    margin: 10,
    justifyContent: 'space-between',
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  aboutFooterText: {
    color: 'black',
    margin: 5,
    fontSize: 15,
  },
  aboutHeaderText: {
    color: Colors.primaria,
    margin: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  aboutFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    paddingVertical: 20,
  },
});
