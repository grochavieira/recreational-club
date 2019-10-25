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
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import Colors from '../constants/colors';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import getRealm from '../services/realm';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function EditRegisterScreen(props) {
  /* Guarda os dados que vieram da tela de Atualizar Associados e manda
   * eles para os inputs poderem ser modificados
   */
  const [dadosAssociado, setDadosAssociado] = useState({
    id: props.navigation.getParam('dadosAssociado').id,
    nome: props.navigation.getParam('dadosAssociado').nome,
    email: props.navigation.getParam('dadosAssociado').email,
    telefone: props.navigation.getParam('dadosAssociado').telefone,
    numDependentes: props.navigation.getParam('dadosAssociado').numDependentes,
    nascimento: props.navigation.getParam('dadosAssociado').nascimento,
    sexo: props.navigation.getParam('dadosAssociado').sexo,
    numVisitas: props.navigation.getParam('dadosAssociado').numVisitas,
    masculino: false,
    feminino: false,
    outros: false,
  });

  // Guarda as mensagens de erro para os inputs digitados incorretamente
  const [erro, setErro] = useState({
    inputNome: '',
    inputEmail: '',
    inputTelefone: '',
    inputNumDependentes: '',
    inputNascimento: '',
    inputSexo: '',
  });

  // Guarda os cadastros do banco de dados
  const [cadastros, setCadastros] = useState([]);

  // Roda na primeira vez que entra nessa tela
  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Associate').sorted('id', false);
      setCadastros(dados);
    }

    carregaCadastros();
    if (dadosAssociado.sexo === 'Masculino') {
      setDadosAssociado({...dadosAssociado, masculino: true});
    } else if (dadosAssociado.sexo === 'Feminino') {
      setDadosAssociado({...dadosAssociado, feminino: true});
    } else {
      setDadosAssociado({...dadosAssociado, outros: true});
    }
  }, []);

  /* Pega os valores dos inputs digitados e apaga as mensagens
   * de erro quando as condições necessárias são alcançadas
   */
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

  // Aqui também impede que o usuário digite qualquer coisa que não seja números
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
        Alert.alert('Por favor digite apenas números!');
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

  const diminuiNumVisitas = () => {
    if (dadosAssociado.numVisitas - 1 < 0) {
      setDadosAssociado({...dadosAssociado, numVisitas: 0});
      Alert.alert('Não é possível decrementar mais!');
    } else {
      setDadosAssociado({
        ...dadosAssociado,
        numVisitas: dadosAssociado.numVisitas - 1,
      });
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

  // Pega os dados de cadastro depois de verificados e atualiza o banco
  async function atualizaCadastro() {
    dados = {
      id: dadosAssociado.id,
      nomeCompleto: dadosAssociado.nome,
      email: dadosAssociado.email,
      telefone: dadosAssociado.telefone,
      numDependentes: dadosAssociado.numDependentes,
      nascimento: dadosAssociado.nascimento,
      sexo: dadosAssociado.sexo,
      numVisitas: dadosAssociado.numVisitas,
    };

    const realm = await getRealm();

    realm.write(() => {
      /* A condição true indica que se existir um dado
       * com a mesma chave primária (id), ele será substituido
       */
      realm.create('Associate', dados, true);
    });
  }

  // Valida os dados a serem atualizados e atualiza se estiverem corretos, voltando para a tela de Atualizar Associados
  async function atualiza() {
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
      await atualizaCadastro();
      props.navigation.pop(); // Volta uma tela
      props.navigation.getParam('setRefresh')(
        !props.navigation.getParam('refresh'),
      ); // Atualiza a FlatList assim que volta
      Alert.alert('Cadastro atualizado com sucesso!');
      props.navigation.getParam('listaTodosAssociados')(); // Lista todos os associados
    } else {
      Alert.alert('Não foi possível atualizar o cadastro!');
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
          <Header textHeader="Editar dados do Associado" />

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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <View style={styles.principalGenderContainer}>
                <View style={styles.genderContainer}>
                  <View style={styles.genderHeader}>
                    <IconCommunity
                      name="human-male-female"
                      size={24}
                      color="#FFF"
                    />
                    <Text style={styles.genderHeaderText}>SEXO: </Text>
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

              <View style={styles.visitContainer}>
                <View style={styles.visitHeader}>
                  <IconAwesome name="walking" size={24} color="#FFF" />
                  <Text style={styles.visitHeaderText}>VISITAS: </Text>
                </View>
                <View style={styles.visitBody}>
                  <Text style={styles.visitBodyText}>
                    {dadosAssociado.numVisitas}
                  </Text>
                </View>
                <View style={styles.visitFooter}>
                  <TouchableOpacity
                    style={styles.visitActionBox}
                    onPress={() =>
                      setDadosAssociado({
                        ...dadosAssociado,
                        numVisitas: dadosAssociado.numVisitas + 1,
                      })
                    }>
                    <IconAntDesign name="plus" size={20} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.visitActionBox,
                      backgroundColor: '#FF3366',
                    }}
                    onPress={diminuiNumVisitas}>
                    <IconAntDesign name="minus" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <CustomButton textButton="ATUALIZAR" confirm={atualiza} />
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
  genderHeaderText: {
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
  visitHeaderText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  visitActionBox: {
    backgroundColor: Colors.primaria,
    borderRadius: 20,
    padding: 7,
    margin: 10,
  },
  visitContainer: {
    backgroundColor: 'rgba(0,159,253,0.1)',
    borderRadius: 4,
    margin: 10,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
  visitFooter: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  visitBody: {
    borderBottomWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  visitBodyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
