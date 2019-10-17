import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  CheckBox,
  Text,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/colors';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import getRealm from '../services/realm';

export default function RegisterScreen() {
  const [dadosCliente, setDadosCliente] = useState({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    numDependentes: '',
    aniversario: '',
    sexo: '',
    masculino: false,
    feminino: false,
    outros: false,
  });

  const [erro, setErro] = useState({
    inputNome: '',
    inputEmail: '',
    inputTelefone: '',
    inputNumDependentes: '',
    inputAniversario: '',
    inputSexo: '',
  });

  const [cadastros, setCadastros] = useState([]);

  let clienteId = 0;

  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Client').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  const clickNome = nome => {
    setDadosCliente({...dadosCliente, nome: nome});
    if (nome != '') {
      setErro({...erro, inputNome: ''});
    }
  };

  const clickEmail = email => {
    setDadosCliente({...dadosCliente, email: email});
    if (email != '') {
      setErro({...erro, inputEmail: ''});
    }
  };

  const clickTelefone = telefone => {
    setDadosCliente({...dadosCliente, telefone: telefone});
    if (telefone.length === 11) {
      setErro({...erro, inputTelefone: ''});
    }
  };

  const clickNumDependentes = numDependentes => {
    setDadosCliente({...dadosCliente, numDependentes: numDependentes});
    if (numDependentes != '') {
      setErro({...erro, inputNumDependentes: ''});
    }
  };

  const clickAniversario = aniversario => {
    setDadosCliente({...dadosCliente, aniversario: aniversario});
    if (aniversario != '') {
      setErro({...erro, inputAniversario: ''});
    }
  };

  const clickMale = () => {
    setDadosCliente({
      ...dadosCliente,
      masculino: !dadosCliente.masculino,
      feminino: false,
      outros: false,
    });
    setErro({...erro, inputSexo: ''});
  };

  const clickFemale = () => {
    setDadosCliente({
      ...dadosCliente,
      masculino: false,
      feminino: !dadosCliente.feminino,
      outros: false,
    });
    setErro({...erro, inputSexo: ''});
  };

  const clickOthers = () => {
    setDadosCliente({
      ...dadosCliente,
      masculino: false,
      feminino: false,
      outros: !dadosCliente.outros,
    });
    setErro({...erro, inputSexo: ''});
  };

  async function guardaCadastro() {
    dados = {
      id: clienteId,
      nomeCompleto: dadosCliente.nome,
      email: dadosCliente.email,
      telefone: dadosCliente.telefone,
      numDependentes: dadosCliente.numDependentes,
      aniversario: dadosCliente.aniversario,
      sexo: dadosCliente.sexo,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Client', dados);
    });
  }

  async function cadastra() {
    let verificaErros = 0;
    let mensagemErro = [];

    if (dadosCliente.nome === '') {
      verificaErros++;
      mensagemErro[0] = '*Favor preencher campo';
    } else {
      mensagemErro[0] = '';
    }

    if (dadosCliente.email === '') {
      verificaErros++;
      mensagemErro[1] = '*Favor preencher campo';
    } else {
      mensagemErro[1] = '';
    }

    if (dadosCliente.telefone.length < 11) {
      verificaErros++;
      mensagemErro[2] = '*Campo inserido incorretamente';
    } else {
      mensagemErro[2] = '';
    }

    if (dadosCliente.numDependentes === '') {
      verificaErros++;
      mensagemErro[3] = '*Favor preencher campo';
    } else {
      mensagemErro[3] = '';
    }

    if (dadosCliente.aniversario === '') {
      verificaErros++;
      mensagemErro[4] = '*Favor preencher campo';
    } else {
      mensagemErro[4] = '';
    }

    if (
      dadosCliente.masculino === false &&
      dadosCliente.feminino === false &&
      dadosCliente.outros === false
    ) {
      verificaErros++;
      mensagemErro[5] = '*Escolha uma das opções';
    } else if (dadosCliente.masculino === true) {
      dadosCliente.sexo = 'Masculino';
      mensagemErro[5] = '';
    } else if (dadosCliente.feminino === true) {
      dadosCliente.sexo = 'Feminino';
      mensagemErro[5] = '';
    } else {
      dadosCliente.sexo = 'Outros';
      mensagemErro[5] = '';
    }

    setErro({
      ...erro,
      inputNome: mensagemErro[0],
      inputEmail: mensagemErro[1],
      inputTelefone: mensagemErro[2],
      inputNumDependentes: mensagemErro[3],
      inputAniversario: mensagemErro[4],
      inputSexo: mensagemErro[5],
    });
    if (verificaErros === 0) {
      cadastros.map(item => (clienteId = item.id + 1));
      await guardaCadastro();
      Alert.alert('Cadastro realizado com sucesso!');
      setDadosFuncionario({});
    } else {
      Alert.alert('Não foi possível realizar o cadastro!');
    }
  }

  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.principalContainer}>
          <Header textHeader="Cadastro de Associados" />

          <View style={styles.principalInputContainer}>
            <Input
              nameIcon="person"
              textPlaceHolder="Digite o nome completo"
              length={30}
              value={dadosCliente.nome}
              onChange={clickNome}
              inputErrorText={erro.inputNome}
              inputTextTitle="NOME"
            />
            <Input
              nameIcon="email"
              textPlaceHolder="Digite o endereço de email"
              length={30}
              value={dadosCliente.email}
              onChange={clickEmail}
              inputErrorText={erro.inputEmail}
              inputTextTitle="EMAIL"
            />
            <Input
              nameIcon="phone"
              textPlaceHolder="Digite o número de tel./cel."
              keyboard="numeric"
              length={11}
              value={dadosCliente.telefone}
              onChange={clickTelefone}
              inputErrorText={erro.inputTelefone}
              inputTextTitle="TELEFONE/CELULAR"
            />
            <Input
              nameIcon="people"
              textPlaceHolder="Marido, esposa, filhos(as), etc..."
              keyboard="numeric"
              length={2}
              value={dadosCliente.numDependentes}
              onChange={clickNumDependentes}
              inputErrorText={erro.inputNumDependentes}
              inputTextTitle="NÚMERO DE DEPENDENTES"
            />

            <View style={styles.principalDatePickerContainer}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#FFF',
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}>
                DATA DE ANIVERSÁRIO
              </Text>
              <View style={styles.datePickerContainer}>
                <Icon name="date-range" size={24} color="#FFF" />
                <DatePicker
                  style={{width: '100%'}}
                  date={dadosCliente.aniversario}
                  placeholder="Escolha a data de aniversário"
                  format="DD-MM-YYYY"
                  minDate="01-01-1910"
                  maxDate="31-12-2001"
                  showIcon={false}
                  onDateChange={clickAniversario}
                  customStyles={{
                    dateText: {
                      fontSize: 16,
                      color: 'white',
                      alignSelf: 'flex-start',
                      marginHorizontal: 5,
                    },
                    dateInput: {
                      borderWidth: 0,
                    },
                    placeholderText: {
                      fontSize: 16,
                      color: 'rgba(255,255,255,0.7)',
                      alignSelf: 'flex-start',
                      marginLeft: 5,
                    },
                  }}
                />
              </View>
              <Text style={styles.errorText}>{erro.inputAniversario}</Text>
            </View>

            <View style={styles.principalGenderContainer}>
              <View style={styles.genderContainer}>
                <View style={styles.genderHeader}>
                  <IconCommunity
                    name="human-male-female"
                    size={24}
                    color="#FFF"
                  />
                  <Text style={styles.textGenderHeader}>SEXO: </Text>
                </View>
                <View>
                  <View style={styles.maleContainer}>
                    <CheckBox
                      value={dadosCliente.masculino}
                      onChange={clickMale}
                    />
                    <Text style={styles.textGenders}>Masculino</Text>
                  </View>
                  <View style={styles.femaleContainer}>
                    <CheckBox
                      value={dadosCliente.feminino}
                      onChange={clickFemale}
                    />
                    <Text style={styles.textGenders}>Feminino</Text>
                  </View>
                  <View style={styles.othersContainer}>
                    <CheckBox
                      value={dadosCliente.outros}
                      onChange={clickOthers}
                    />
                    <Text style={styles.textGenders}>Outros</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.errorText}>{erro.inputSexo}</Text>
            </View>
          </View>

          <CustomButton textButton="CADASTRAR" confirm={cadastra} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  principalContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  principalInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
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
    backgroundColor: 'rgba(0,159,253,0.1)',
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
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    margin: 5,
  },
  textGenderHeader: {
    color: '#FFF',
    fontSize: 12,
    margin: 5,
    fontWeight: 'bold',
  },
  genderHeader: {
    margin: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  principalGenderContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  errorText: {
    fontWeight: 'bold',
    color: '#FF3366',
    fontSize: 10,
  },
  principalDatePickerContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
});
