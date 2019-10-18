import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Colors from '../constants/colors';
import getRealm from '../services/realm';

export default function LoginScreen(props) {
  const [dadosFuncionario, setDadosFuncionario] = useState({
    usuario: '',
    senha: '',
  });

  const [mostraSenha, setMostraSenha] = useState({
    olho: 'eye-slash',
    senha: true,
  });

  const [erro, setErro] = useState({inputUsuario: '', inputSenha: ''});

  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Employee').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  const clickUsuario = usuario => {
    setDadosFuncionario({...dadosFuncionario, usuario: usuario});
    if (usuario.length >= 8) {
      setErro({...erro, inputUsuario: ''});
    }
  };

  const clickSenha = senha => {
    setDadosFuncionario({...dadosFuncionario, senha: senha});
    if (senha.length >= 8) {
      setErro({...erro, inputSenha: ''});
    }
  };

  function clickEye() {
    if (mostraSenha.olho === 'eye-slash') {
      setMostraSenha({olho: 'eye', senha: false});
    } else {
      setMostraSenha({olho: 'eye-slash', senha: true});
    }
  }

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

  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.principalContainer}>
          <Header textHeader="Bem Vindo ao Clube Recreativo" />
          <Icon name="headset" size={150} color="#FFF" />
          <View style={styles.loginContainer}>
            <Input
              nameIcon="account-box"
              textPlaceHolder="Digite seu usuário"
              value={dadosFuncionario.usuario}
              onChange={clickUsuario}
              inputErrorText={erro.inputUsuario}
              inputTextTitle="USUÁRIO"
            />
            <PasswordInput
              nameIcon="lock"
              textPlaceHolder="Digite sua senha"
              value={dadosFuncionario.senha}
              onChange={clickSenha}
              inputErrorText={erro.inputSenha}
              inputTextTitle="SENHA"
              security={mostraSenha.senha}
              mudaOlho={mostraSenha.olho}
              mostraSenha={clickEye}
            />
          </View>
          <CustomButton textButton="ENTRAR" confirm={confirmaRegistro} />
          <CustomButton
            style={styles.buttonContainer}
            textButton="SEM CADASTRO?"
            confirm={() => props.navigation.push('RegisterEmployee')}
          />
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
