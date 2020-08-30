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
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/colors';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import getRealm from '../services/realm';

export default function RegisterScreen() {
  // Guarda os dados digitados pelo usuário para cadastro de associado
  const [dadosAssociado, setDadosAssociado] = useState({
    nome: '',
    email: '',
    telefone: '',
    numDependentes: '',
    nascimento: '',
    sexo: '',
    numVisitas: 0,
    masculino: false,
    feminino: false,
    outros: false,
  });

  // Guarda as mensagens de erro se algum input de dados estiver errado
  const [erro, setErro] = useState({
    inputNome: '',
    inputEmail: '',
    inputTelefone: '',
    inputNumDependentes: '',
    inputNascimento: '',
    inputSexo: '',
  });

  // Guarda os dados de cadastro do banco de dados dos associados
  const [cadastros, setCadastros] = useState([]);

  // Será usado para pegar o próximo id de cadastro de associado disponível
  let idDisponivelAssociado = 1;

  // Roda a primeira vez que entra nessa tela para pegar os cadastros de associado do banco de dados
  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Associate').sorted('id', false);
      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  // Pega os inputs do usuário e apaga a mensagem de erro se as condições forem alcançadas
  const changeNome = nome => {
    setDadosAssociado({...dadosAssociado, nome: nome});
    if (nome != '') {
      setErro({...erro, inputNome: ''});
    }
  };

  const changeEmail = email => {
    setDadosAssociado({...dadosAssociado, email: email});
    if (email != '') {
      setErro({...erro, inputEmail: ''});
    }
  };

  /* Aqui também não deixa o usuário digitar outras coisas além de números,
   *  se digitar letras e simbolos, serão apagadas
   */
  const changeTelefone = telefone => {
    let novoTexto = '';
    let numeros = '0123456789';

    for (var i = 0; i < telefone.length; i++) {
      if (numeros.indexOf(telefone[i]) > -1) {
        novoTexto = novoTexto + telefone[i];
      } else {
      }
    }
    setDadosAssociado({...dadosAssociado, telefone: novoTexto});
    if (telefone.length === 11) {
      setErro({...erro, inputTelefone: ''});
    }
  };

  const changeNumDependentes = numDependentes => {
    let novoTexto = '';
    let numeros = '0123456789';

    for (var i = 0; i < numDependentes.length; i++) {
      if (numeros.indexOf(numDependentes[i]) > -1) {
        novoTexto = novoTexto + numDependentes[i];
      } else {
      }
    }
    setDadosAssociado({...dadosAssociado, numDependentes: novoTexto});
    if (numDependentes != '') {
      setErro({...erro, inputNumDependentes: ''});
    }
  };

  const changeNascimento = nascimento => {
    setDadosAssociado({...dadosAssociado, nascimento: nascimento});
    if (nascimento != '') {
      setErro({...erro, inputNascimento: ''});
    }
  };

  // Muda a condição da checkbox quando o usuário clica nas caixinhas de escolha
  const changeMale = () => {
    setDadosAssociado({
      ...dadosAssociado,
      masculino: !dadosAssociado.masculino,
      feminino: false,
      outros: false,
    });
    setErro({...erro, inputSexo: ''});
  };

  const changeFemale = () => {
    setDadosAssociado({
      ...dadosAssociado,
      masculino: false,
      feminino: !dadosAssociado.feminino,
      outros: false,
    });
    setErro({...erro, inputSexo: ''});
  };

  const changeOthers = () => {
    setDadosAssociado({
      ...dadosAssociado,
      masculino: false,
      feminino: false,
      outros: !dadosAssociado.outros,
    });
    setErro({...erro, inputSexo: ''});
  };

  // Guarda no banco de dados os cadastros após as verificações
  async function guardaCadastro() {
    dados = {
      id: idDisponivelAssociado,
      nomeCompleto: dadosAssociado.nome,
      email: dadosAssociado.email,
      telefone: dadosAssociado.telefone,
      numDependentes: dadosAssociado.numDependentes,
      nascimento: dadosAssociado.nascimento,
      sexo: dadosAssociado.sexo,
      numVisitas: dadosAssociado.numVisitas,
    };

    // Pega o banco de dados
    const realm = await getRealm();

    // Abre o banco em modo de escrita
    realm.write(() => {
      realm.create('Associate', dados); // Cria um novo cadastro com os dados digitados
    });
  }

  // Verifica os erros de dados e cadastra se tudo estiver correto
  async function cadastra() {
    let verificaErros = 0;
    let mensagemErro = [];

    if (dadosAssociado.nome === '') {
      verificaErros++;
      mensagemErro[0] = '*Favor preencher campo';
    } else {
      mensagemErro[0] = '';
    }

    if (dadosAssociado.email === '') {
      verificaErros++;
      mensagemErro[1] = '*Favor preencher campo';
    } else {
      mensagemErro[1] = '';
    }

    if (dadosAssociado.telefone.length < 11) {
      verificaErros++;
      mensagemErro[2] = '*Campo inserido incorretamente';
    } else {
      mensagemErro[2] = '';
    }

    if (dadosAssociado.numDependentes === '') {
      verificaErros++;
      mensagemErro[3] = '*Favor preencher campo';
    } else {
      mensagemErro[3] = '';
    }

    if (dadosAssociado.nascimento === '') {
      verificaErros++;
      mensagemErro[4] = '*Favor preencher campo';
    } else {
      mensagemErro[4] = '';
    }

    if (
      dadosAssociado.masculino === false &&
      dadosAssociado.feminino === false &&
      dadosAssociado.outros === false
    ) {
      verificaErros++;
      mensagemErro[5] = '*Escolha uma das opções';
    } else if (dadosAssociado.masculino === true) {
      dadosAssociado.sexo = 'Masculino';
      mensagemErro[5] = '';
    } else if (dadosAssociado.feminino === true) {
      dadosAssociado.sexo = 'Feminino';
      mensagemErro[5] = '';
    } else {
      dadosAssociado.sexo = 'Outros';
      mensagemErro[5] = '';
    }

    setErro({
      ...erro,
      inputNome: mensagemErro[0],
      inputEmail: mensagemErro[1],
      inputTelefone: mensagemErro[2],
      inputNumDependentes: mensagemErro[3],
      inputNascimento: mensagemErro[4],
      inputSexo: mensagemErro[5],
    });
    if (verificaErros === 0) {
      cadastros.map(item => {
        if (idDisponivelAssociado === item.id) {
          idDisponivelAssociado++;
        }
      }); // Pega o próximo id disponível
      await guardaCadastro(); // Espera mandar o cadastro para o banco de dados dos associados
      Alert.alert('Cadastro realizado com sucesso!');
      setDadosAssociado({
        nome: '',
        email: '',
        telefone: '',
        numDependentes: '',
        nascimento: '',
        sexo: '',
        numVisitas: 0,
        masculino: false,
        feminino: false,
        outros: false,
      }); // Apaga os inputs de dados
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
              length={28}
              value={dadosAssociado.nome}
              onChange={changeNome}
              inputErrorText={erro.inputNome}
              inputTextTitle="NOME"
            />
            <Input
              nameIcon="email"
              textPlaceHolder="Digite o endereço de email"
              length={30}
              value={dadosAssociado.email}
              onChange={changeEmail}
              inputErrorText={erro.inputEmail}
              inputTextTitle="EMAIL"
            />
            <Input
              nameIcon="phone"
              textPlaceHolder="Digite o número de tel./cel."
              keyboard="numeric"
              length={11}
              value={dadosAssociado.telefone}
              onChange={changeTelefone}
              inputErrorText={erro.inputTelefone}
              inputTextTitle="TELEFONE/CELULAR"
            />
            <Input
              nameIcon="people"
              textPlaceHolder="Marido, esposa, filhos(as), etc..."
              keyboard="numeric"
              length={2}
              value={dadosAssociado.numDependentes}
              onChange={changeNumDependentes}
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
                DATA DE NASCIMENTO
              </Text>
              <View style={styles.datePickerContainer}>
                <Icon name="date-range" size={24} color="#FFF" />
                <DatePicker
                  style={{width: '100%'}}
                  date={dadosAssociado.nascimento}
                  placeholder="Escolha a data de nascimento"
                  format="DD-MM-YYYY"
                  minDate="01-01-1910"
                  maxDate="31-12-2001"
                  showIcon={false}
                  onDateChange={changeNascimento}
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
              <Text style={styles.errorText}>{erro.inputNascimento}</Text>
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
                      value={dadosAssociado.masculino}
                      onChange={changeMale}
                    />
                    <Text style={styles.textGenders}>Masculino</Text>
                  </View>
                  <View style={styles.femaleContainer}>
                    <CheckBox
                      value={dadosAssociado.feminino}
                      onChange={changeFemale}
                    />
                    <Text style={styles.textGenders}>Feminino</Text>
                  </View>
                  <View style={styles.othersContainer}>
                    <CheckBox
                      value={dadosAssociado.outros}
                      onChange={changeOthers}
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
