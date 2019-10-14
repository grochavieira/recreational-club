import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Card = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={styles.cardContainer}>
        <View style={styles.iconStyle}>
          <Icon name={props.iconName} size={30} color="#FFF" />
        </View>
        <Text style={styles.cardText}>{props.cardText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 4,
    margin: 10,
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    color: '#FFF',
    margin: 10,
  },
  iconStyle: {
    margin: 10,
  },
});

export default Card;
