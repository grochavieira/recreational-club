import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sportsLogo from '../img/sports_club_logo.png';

import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Colors from '../constants/colors';
import getRealm from '../services/realm';

export default function LoginScreen(props) {
  // Guarda os dados de input do usuário
  const [dadosFuncionario, setDadosFuncionario] = useState({
    usuario: '',
    senha: '',
  });

  // Animação do olho e se a senha será visível ou não
  const [mostraSenha, setMostraSenha] = useState({
    olho: 'eye-slash',
    senhaInvisivel: true,
  });

  // Mostra o erro caso o usuário erre o input de usuario ou senha
  const [erro, setErro] = useState({inputUsuario: '', inputSenha: ''});

  // Guarda os cadastros de funcionário no banco de dados
  const [cadastros, setCadastros] = useState([]);

  // Roda na primeira vez que entra na tela de login para pegar os dados do banco de dados
  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();
      const dados = realm.objects('Employee').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  // Pega os dados do input do usuario
  const changeUsuario = usuario => {
    setDadosFuncionario({...dadosFuncionario, usuario: usuario});
    if (usuario.length >= 8) {
      setErro({...erro, inputUsuario: ''});
    }
  };

  // Pega os dados do input da senha
  const changeSenha = senha => {
    setDadosFuncionario({...dadosFuncionario, senha: senha});
    if (senha.length >= 8) {
      setErro({...erro, inputSenha: ''});
    }
  };

  // Muda o icone do olho ao ser clicado, tornando a senha visível ou não
  function changeEye() {
    if (mostraSenha.olho === 'eye-slash') {
      setMostraSenha({olho: 'eye', senhaInvisivel: false});
    } else {
      setMostraSenha({olho: 'eye-slash', senhaInvisivel: true});
    }
  }

  // Verifica se os dados digitados existem para mandar o usuário para a tela principal
  function confirmaRegistro() {
    let existeUsuario = false;
    let existeCadastro = false;
    let mensagemErro = [];

    cadastros.map(dados => {
      if (dadosFuncionario.usuario === dados.usuario) {
        existeUsuario = true;
        if (dadosFuncionario.senha === dados.senha) {
          existeCadastro = true;
        }
      }
    });

    if (existeUsuario) {
      mensagemErro[0] = '';
      mensagemErro[1] = '*Senha incorreta';
    } else {
      mensagemErro[0] = '*Usuário não existe';
      mensagemErro[1] = '';
    }

    if (existeCadastro) {
      Alert.alert('Bem Vindo ao Clube');
      setDadosFuncionario({});
      props.navigation.push('Main');
    } else {
      setErro({
        ...erro,
        inputUsuario: mensagemErro[0],
        inputSenha: mensagemErro[1],
      });
      Alert.alert('Não foi possível entrar!');
    }
  }

  // <Icon name="headset" size={150} color="#FFF" />

  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.principalContainer}>
          <Header textHeader="Bem Vindo ao Clube Recreativo" />
          <Image
            source={sportsLogo}
            style={{width: 180, height: 180, marginTop: -20}}
          />
          <View style={styles.loginContainer}>
            <Input
              nameIcon="account-box"
              textPlaceHolder="Digite seu usuário"
              value={dadosFuncionario.usuario}
              onChange={changeUsuario}
              inputErrorText={erro.inputUsuario}
              inputTextTitle="USUÁRIO"
            />
            <PasswordInput
              nameIcon="lock"
              textPlaceHolder="Digite sua senha"
              value={dadosFuncionario.senha}
              onChange={changeSenha}
              inputErrorText={erro.inputSenha}
              inputTextTitle="SENHA"
              security={mostraSenha.senhaInvisivel}
              mudaOlho={mostraSenha.olho}
              mostraSenha={changeEye}
            />
          </View>
          <CustomButton textButton="ENTRAR" confirm={confirmaRegistro} />
          <CustomButton
            style={styles.buttonContainer}
            textButton="SEM CADASTRO?"
            confirm={() => props.navigation.push('RegisterEmployee')}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}
            onPress={() => props.navigation.push('ForgotPassword')}>
            <Text
              style={{
                color: '#FF3366',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              ESQUECEU A SENHA?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
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
  loginContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#FFF',
    color: Colors.primaria,
    borderColor: '#FFF',
  },
});
