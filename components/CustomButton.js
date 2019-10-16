import React from 'react';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

const CustomButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.buttonContainer, ...props.style}}
      onPress={props.confirm}>
      <Text style={{...styles.buttonText}}>{props.textButton}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '70%',
    flexDirection: 'row',
    borderColor: Colors.primaria,
    backgroundColor: Colors.primaria,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;
