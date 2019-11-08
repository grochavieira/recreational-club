import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          <View style={styles.flatListItemBodyLine}>
            <View style={styles.flatListItemBodyBox}>
              <Text style={styles.flatListItemBodyLabelText}>ID:</Text>
              <Text style={{...styles.flatListItemBodyValueText}}>
                {props.idAssociado}
              </Text>
            </View>
            <View style={styles.flatListItemBodyBox}>
              <Text style={styles.flatListItemBodyLabelText}>TELEFONE:</Text>
              <Text style={{...styles.flatListItemBodyValueText}}>
                {props.telefoneAssociado}
              </Text>
            </View>
          </View>

          <View style={styles.flatListItemBodyBox}>
            <Text style={styles.flatListItemBodyLabelText}>EMAIL:</Text>
            <Text
              style={{...styles.flatListItemBodyValueText}}
              numberOfLines={1}>
              {props.emailAssociado}
            </Text>
          </View>

          <View style={styles.flatListItemBodyLine}>
            <View style={styles.flatListItemBodyBox}>
              <Text style={styles.flatListItemBodyLabelText}>SEXO:</Text>
              <Text style={{...styles.flatListItemBodyValueText}}>
                {props.sexoAssociado}
              </Text>
            </View>
            <View style={styles.flatListItemBodyBox}>
              <Text style={styles.flatListItemBodyLabelText}>NASCIMENTO:</Text>
              <Text style={{...styles.flatListItemBodyValueText}}>
                {props.nascimentoAssociado}
              </Text>
            </View>
          </View>

          <View style={styles.flatListItemBodyLine}>
            <View style={styles.flatListItemBodyBox}>
              <Text style={styles.flatListItemBodyLabelText}>
                N. DE DEPENDENTES:
              </Text>
              <Text style={{...styles.flatListItemBodyValueText}}>
                {props.numDependentesAssociado}
              </Text>
            </View>
            <View style={styles.flatListItemBodyBox}>
              <Text style={styles.flatListItemBodyLabelText}>
                N. DE VISITAS:
              </Text>
              <Text style={{...styles.flatListItemBodyValueText}}>
                {props.visitasAssociado}
              </Text>
            </View>
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
  flatListItemBodyLabelText: {
    color: '#FFF',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 13,
  },
  flatListItemBodyValueText: {
    color: '#FFF',
    margin: 5,
    fontSize: 13,
  },
  flatListItemBody: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  flatListItemBodyBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    margin: 5,
  },
  flatListItemBodyLine: {
    flexDirection: 'row',
  },
  flatListItemHeaderText: {
    color: '#FFF',
    margin: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlatListItem;
