import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View, StyleSheet, StatusBar} from 'react-native';
import Colors from '../constants/colors';
//<Icon name="headset" size={150} color="#FFF" />
const Header = props => {
  return (
    <View style={{...styles.headerContainer, ...props.style}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaria} />
      <Text style={{...styles.headerText, ...props.style}}>
        {props.textHeader}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  headerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
