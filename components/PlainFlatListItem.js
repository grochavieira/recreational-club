import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import Colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FlatListItem = props => {
  return (
    <View style={styles.principalContainer}>
      <View style={{...styles.flatListItemContainer, ...props.styleContainer}}>
        <View style={styles.flatListItemHeader}>
          <Icon name="account-circle" size={30} color="#FFF" />
          <Text
            style={{...styles.flatListItemHeaderText, marginLeft: 2}}
            numberOfLines={1}>
            {props.nomeAssociado}
          </Text>
        </View>
        <View style={styles.flatListItemBody}>
          <View>
            <Text style={styles.flatListItemBodyText}>Email:</Text>
            <Text style={styles.flatListItemBodyText}>Telefone: </Text>
            <Text style={styles.flatListItemBodyText}>Sexo: </Text>
            <Text style={styles.flatListItemBodyText}>Nascimento:</Text>
            <Text style={styles.flatListItemBodyText}>Dependentes:</Text>
            <Text style={styles.flatListItemBodyText}>Visitas:</Text>
          </View>
          <View>
            <Text style={{...styles.flatListItemBodyText}} numberOfLines={1}>
              {props.emailAssociado}
            </Text>
            <Text style={styles.flatListItemBodyText}>
              {props.telefoneAssociado}
            </Text>
            <Text style={styles.flatListItemBodyText}>
              {props.sexoAssociado}
            </Text>
            <Text style={styles.flatListItemBodyText}>
              {props.aniversarioAssociado}
            </Text>
            <Text style={styles.flatListItemBodyText}>
              {props.numDependentesAssociado}
            </Text>
            <Text style={styles.flatListItemBodyText}>
              {props.visitasAssociado}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  principalContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cor: {
    flex: 1,
  },
  flatListItemContainer: {
    width: '90%',
    backgroundColor: Colors.primaria,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'space-between',
  },
  flatListItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderColor: '#FFF',
  },
  flatListItemBodyText: {
    color: '#FFF',
    margin: 5,
    fontSize: 14,
  },
  flatListItemBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  flatListItemHeaderText: {
    color: '#FFF',
    margin: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlatListItem;
