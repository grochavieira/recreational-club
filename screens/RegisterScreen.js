import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  CheckBox,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Colors from '../constants/colors';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
//import getRealm from '../services/realm';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      telefone: '',
      numDependentes: '',
      sexo: '',
      masculino: false,
      feminino: false,
      outros: false,
      aniversario: '',
      erroNome: '',
      erroEmail: '',
      erroTelefone: '',
      erroNumDependentes: '',
      erroSexo: '',
      erroAniversario: '',
    };
  }

  getNome = nome => {
    this.setState({nome: nome});
    if (nome.length > 0) {
      this.setState({erroNome: ' '});
    }
  };

  getMail = email => {
    this.setState({email: email});
    if (email.length > 0) {
      this.setState({erroEmail: ' '});
    }
  };

  getPhone = telefone => {
    this.setState({telefone: telefone});
    if (telefone.length === 11) {
      this.setState({erroTelefone: ' '});
    }
  };

  getNumDependentes = numDependentes => {
    this.setState({numDependentes: numDependentes});
    if (numDependentes.length > 0) {
      this.setState({erroNumDependentes: ' '});
    }
  };

  selectDate = aniversario => {
    this.setState({aniversario: aniversario});
    if (aniversario.lenght > 0) {
      this.setState({erroAniversario: ' '});
    }
  };

  checkBoxMasculino() {
    this.setState({
      masculino: !this.state.masculino,
      feminino: false,
      outros: false,
    });
    this.setState({erroSexo: ' '});
  }

  checkBoxFeminino() {
    this.setState({
      feminino: !this.state.feminino,
      masculino: false,
      outros: false,
    });
    this.setState({erroSexo: ' '});
  }

  checkBoxOutros() {
    this.setState({
      feminino: false,
      masculino: false,
      outros: !this.state.outros,
    });
    this.setState({erroSexo: ' '});
  }

  Cadastra = () => {
    let verificaErros = 0;
    if (this.state.nome === '') {
      verificaErros++;
      this.setState({erroNome: '*Campo Inserido Incorretamente'});
    }

    if (this.state.email === '') {
      verificaErros++;
      this.setState({erroEmail: '*Campo Inserido Incorretamente'});
    }

    if (this.state.telefone.length < 11) {
      verificaErros++;
      this.setState({erroTelefone: '*Campo Inserido Incorretamente'});
    }

    if (this.state.numDependentes === '') {
      verificaErros++;
      this.setState({erroNumDependentes: '*Campo Inserido Incorretamente'});
    }

    if (this.state.aniversario === '') {
      verificaErros++;
      this.setState({erroAniversario: '*Campo Inserido Incorretamente'});
    }

    if (
      this.state.masculino === false &&
      this.state.feminino === false &&
      this.state.outros === false
    ) {
      verificaErros++;
      this.setState({erroSexo: '*Escolha uma das opções'});
    } else if (this.state.masculino === true) {
      sexo = 'Masculino';
    } else if (this.state.feminino === true) {
      sexo = 'Feminino';
    } else {
      sexo = 'Outros';
    }

    if (verificaErros === 0) {
      //realm.write(() => {
      //realm.create('Client', this.state);
      //});

      Alert.alert('Cadastro realizado com sucesso!');
    } else {
      Alert.alert('Não foi possível realizar o cadastro!');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.cor}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.principalContainer}>
            <Header
              textHeader="CADASTRAR ASSOCIADO"
              statusBarColor={Colors.primaria}
            />

            <Input
              nameIcon="person"
              textPlaceHolder="Nome Completo"
              length={30}
              onChange={this.getNome}
              inputErrorText={this.state.erroNome}
            />
            <Input
              nameIcon="email"
              textPlaceHolder="Email"
              length={30}
              onChange={this.getMail}
              inputErrorText={this.state.erroEmail}
            />
            <Input
              nameIcon="phone"
              textPlaceHolder="Telefone"
              keyboard="numeric"
              length={11}
              onChange={this.getPhone}
              inputErrorText={this.state.erroTelefone}
            />
            <Input
              nameIcon="people"
              textPlaceHolder="Número de Dependentes"
              keyboard="numeric"
              length={2}
              onChange={this.getNumDependentes}
              inputErrorText={this.state.erroNumDependentes}
            />

            <View style={styles.principalDatePickerContainer}>
              <View style={styles.datePickerContainer}>
                <Icon name="date-range" size={24} color="#FFF" />
                <DatePicker
                  style={{width: '100%'}}
                  date={this.state.aniversario}
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
                      alignSelf: 'flex-start',
                      marginHorizontal: 10,
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
              <Text style={styles.errorText}>{this.state.erroAniversario}</Text>
            </View>

            <View style={styles.principalGenderContainer}>
              <View style={styles.genderContainer}>
                <View style={styles.genderHeader}>
                  <Text style={styles.textGenderHeader}>Sexo: </Text>
                </View>
                <View>
                  <View style={styles.maleContainer}>
                    <CheckBox
                      value={this.state.masculino}
                      onChange={() => this.checkBoxMasculino()}
                    />
                    <IconAwesome name="mars" size={24} color="white" />
                    <Text style={styles.textGenders}>Masculino</Text>
                  </View>
                  <View style={styles.femaleContainer}>
                    <CheckBox
                      value={this.state.feminino}
                      onChange={() => this.checkBoxFeminino()}
                    />
                    <IconAwesome name="venus" size={24} color="white" />
                    <Text style={styles.textGenders}>Feminino</Text>
                  </View>
                  <View style={styles.othersContainer}>
                    <CheckBox
                      value={this.state.outros}
                      onChange={() => this.checkBoxOutros()}
                    />
                    <IconAwesome name="genderless" size={24} color="white" />
                    <Text style={styles.textGenders}>Outros</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.errorText}>{this.state.erroSexo}</Text>
            </View>

            <CustomButton
              textButton="CADASTRAR"
              confirm={() => this.Cadastra()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  principalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingBottom: 100,
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
  othersContainer: {
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
  principalGenderContainer: {
    alignItems: 'flex-end',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  principalDatePickerContainer: {
    alignItems: 'flex-end',
  },
});

export default RegisterScreen;
