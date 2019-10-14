import React from 'react';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CardCommunity = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={styles.cardContainer}>
        <View style={styles.iconStyle}>
          <IconCommunity name={props.iconName} size={30} color="#FFF" />
        </View>
        <Text style={styles.cardText}>{props.cardText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 4,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 15,
    color: '#FFF',
    margin: 10,
  },
  iconStyle: {
    margin: 10,
  },
});

export default CardCommunity;
