import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View, StyleSheet, StatusBar} from 'react-native';
//<Icon name="headset" size={150} color="#FFF" />
const Header = props => {
  return (
    <View style={{...styles.headerContainer, ...props.style}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Text style={{...styles.headerText, ...props.style}}>
        {props.textHeader}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 50,
  },
  headerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
