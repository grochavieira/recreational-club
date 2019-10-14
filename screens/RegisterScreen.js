import React, {Component} from 'react';
import {View, StyleSheet, Alert, CheckBox, Text} from 'react-native';

import Colors from '../constants/colors';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {date: '', masculino: false, feminino: false};
  }

  selectDate = date => {
    this.setState({date: date});
  };

  checkBoxMasculino() {
    this.setState({
      masculino: !this.state.masculino,
      feminino: false,
    });
  }

  checkBoxFeminino() {
    this.setState({
      feminino: !this.state.feminino,
      masculino: false,
    });
  }

  render() {
    return (
      <View style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header
            textHeader="CADASTRAR ASSOCIADO"
            statusBarColor={Colors.primaria}
          />
          <Input
            nameIcon="person"
            textPlaceHolder="Nome Completo"
            length={30}
          />
          <Input nameIcon="email" textPlaceHolder="Email" length={30} />
          <Input
            nameIcon="phone"
            textPlaceHolder="Telefone"
            keyboard="numeric"
            length={11}
          />
          <Input
            nameIcon="people"
            textPlaceHolder="Número de Dependentes"
            keyboard="numeric"
            length={2}
          />

          <View style={styles.genderContainer}>
            <View style={styles.genderHeader}>
              <IconAwesome name="venus-mars" size={24} color="white" />
              <Text style={styles.textGenderHeader}>Sexo: </Text>
            </View>
            <View>
              <View style={styles.maleContainer}>
                <CheckBox
                  value={this.state.masculino}
                  onChange={() => this.checkBoxMasculino()}
                />
                <IconAwesome name="male" size={24} color="white" />
                <Text style={styles.textGenders}>Masculino</Text>
              </View>
              <View style={styles.femaleContainer}>
                <CheckBox
                  value={this.state.feminino}
                  onChange={() => this.checkBoxFeminino()}
                />
                <IconAwesome name="female" size={24} color="white" />
                <Text style={styles.textGenders}>Feminino</Text>
              </View>
            </View>
          </View>

          <View style={styles.datePickerContainer}>
            <Icon name="date-range" size={24} color="#FFF" />
            <DatePicker
              style={{width: '56%'}}
              date={this.state.date}
              placeholder="Data de Aniversário"
              format="DD-MM-YYYY"
              minDate="01-01-1910"
              maxDate="31-12-2001"
              showIcon={false}
              onDateChange={this.selectDate}
              customStyles={{
                dateText: {
                  fontSize: 15,
                  color: 'white',
                  alignSelf: 'flex-end',
                },
                dateInput: {
                  borderWidth: 0,
                },
                placeholderText: {
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.5)',
                },
              }}
            />
          </View>
          <CustomButton
            textButton="CADASTRAR"
            confirm={() => Alert.alert('Cadastro realizado com sucesso!')}
          />
        </View>
      </View>
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
  genderContainer: {
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    margin: 5,
  },
  maleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  femaleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  textGenders: {
    color: '#FFF',
    fontSize: 15,
    margin: 5,
  },
  textGenderHeader: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
    margin: 5,
  },
  genderHeader: {
    margin: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RegisterScreen;
