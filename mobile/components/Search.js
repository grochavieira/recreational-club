import React from 'react';
import Input from './Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../constants/colors';

const Search = props => {
  return (
    <View style={styles.principalContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Input
            length={props.length}
            style={{width: '78%', marginRight: 0}}
            inputTextTitle={props.inputTextTitle}
            nameIcon={props.nameIcon}
            textPlaceHolder={props.textPlaceHolder}
            security={props.security}
            keyboard={props.keyboard}
            length={props.length}
            value={props.value}
            onChange={props.onChange}
          />
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={props.onClickSearchName}>
          <Icon name="search" size={24} color={props.searchColor} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.searchAllButtonContainer}
        onPress={props.onClickListAll}>
        <Text style={{...styles.searchAllText, ...props.searchAllText}}>
          LISTAR TODOS OS ASSOCIADOS
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  principalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  searchButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 0,
  },
  searchInput: {
    alignItems: 'flex-start',
  },
  searchAllButtonContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  searchAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaria,
  },
});

export default Search;
