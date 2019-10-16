import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {date: ''};
  }

  selectDate = date => {
    this.setState({date: date});
  };

  render() {
    return (
      <LinearGradient
        colors={[Colors.primaria, Colors.secundaria]}
        style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header textHeader="Atualizar Associados" />
          <CustomButton
            textButton="ATUALIZAR"
            confirm={() => Alert.alert('Cadastro realizado com sucesso!')}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  principalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cor: {
    flex: 1,
    backgroundColor: Colors.primaria,
  },
  datePickerContainer: {
    width: '70%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
});

export default RegisterScreen;
