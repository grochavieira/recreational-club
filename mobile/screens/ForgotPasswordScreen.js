import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/colors';
import Header from '../components/Header';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import getRealm from '../services/realm';
import CustomButton from '../components/CustomButton';

export default function ForgotPasswordScreen() {
  // Guarda os dados digitados pelo usuário
  const [dadosFuncionario, setDadosFuncionario] = useState({
    email: '',
    usuario: '',
    chaveInscricao: '',
  });

  // Guarda as mensagens de erro caso o usuário erre algum input
  const [erro, setErro] = useState({
    inputEmail: '',
    inputUsuario: '',
    inputChaveInscricao: '',
  });

  // Guarda a troca de icones do olho e se a senha será mostrada ou não (senha)
  const [mostraChave, setMostraChave] = useState({
    olho: 'eye-slash',
    senhaInvisivel: true,
  });

  // Guarda os cadastros dos funcionários que será pegado do banco de dados
  const [cadastros, setCadastros] = useState([]);

  // Pega os dados de cadastro de funcionário do banco de dados
  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Employee').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  // Pega o input digitado pelo usuário e apaga a mensagem de erro se as condições forem alcançadas
  const changeUsuario = usuario => {
    setDadosFuncionario({...dadosFuncionario, usuario: usuario});
    if (usuario.length >= 8) {
      setErro({...erro, inputUsuario: ''});
    }
  };

  const changeEmail = email => {
    setDadosFuncionario({...dadosFuncionario, email: email});
    if (email != '') {
      setErro({...erro, inputEmail: ''});
    }
  };

  const changeChaveInscricao = chaveInscricao => {
    setDadosFuncionario({...dadosFuncionario, chaveInscricao: chaveInscricao});
    if (chaveInscricao != '') {
      setErro({...erro, inputChaveInscricao: ''});
    }
  };

  function changeEyeChave() {
    if (mostraChave.olho === 'eye-slash') {
      setMostraChave({olho: 'eye', senhaInvisivel: false});
    } else {
      setMostraChave({olho: 'eye-slash', senhaInvisivel: true});
    }
  }

  // Verifica se os dados digitados existem e mostra a senha do usuário se tudo estiver correto
  async function recuperarSenha() {
    const realm = await getRealm(); // Pega o banco de dados
    let verificaErros = 0;
    let mensagemErro = [];
    let email = false;
    let usuario = false;

    cadastros.map(dados => {
      if (dadosFuncionario.email === dados.email) {
        email = true;
        if (dadosFuncionario.usuario === dados.usuario) {
          usuario = true;
        }
      }
    });

    if (!email) {
      mensagemErro[0] = '*Esse email não existe';
    } else {
      mensagemErro[0] = '';
    }

    if (email && !usuario) {
      mensagemErro[1] = '*Usuário errado';
    } else {
      mensagemErro[1] = '';
    }

    if (dadosFuncionario.chaveInscricao != 'projetomobile') {
      verificaErros++;
      mensagemErro[2] = '*Chave de Inscrição errada';
    } else {
      mensagemErro[2] = '';
    }

    // Se não existirem erros
    if (verificaErros === 0) {
      const dadosFiltrados = realm
        .objects('Employee')
        .filtered(
          `email == "${dadosFuncionario.email}" AND usuario == "${dadosFuncionario.usuario}"`,
        ); // Filtra do banco de dados os cadastros que tem o mesmo usuário e senha digitados
      if (dadosFiltrados.length === 0) {
        Alert.alert('Não foi possível recuperar a senha!');
      } else {
        let senha = '';
        dadosFiltrados.map(dados => (senha = dados.senha));
        Alert.alert('Sua senha é: ' + senha); // Mostra uma mensagem da senha do usuário
      }
    } else {
      setErro({
        ...erro,
        inputEmail: mensagemErro[0],
        inputUsuario: mensagemErro[1],
        inputChaveInscricao: mensagemErro[2],
      });
      Alert.alert('Não foi possível recuperar a senha!');
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
          <Header textHeader="Esqueceu a Senha" />
          <View style={styles.aboutContainer}>
            <Input
              nameIcon="email"
              textPlaceHolder="Digite o seu endereço de email"
              length={30}
              value={dadosFuncionario.email}
              onChange={changeEmail}
              inputErrorText={erro.inputEmail}
              inputTextTitle="EMAIL"
            />

            <Input
              nameIcon="account-box"
              textPlaceHolder="Digite o seu login de usuário"
              length={20}
              value={dadosFuncionario.usuario}
              onChange={changeUsuario}
              inputErrorText={erro.inputUsuario}
              inputTextTitle="USUÁRIO"
            />

            <PasswordInput
              nameIcon="vpn-key"
              textPlaceHolder="Digite a chave para se cadastrar"
              value={dadosFuncionario.chaveInscricao}
              onChange={changeChaveInscricao}
              inputErrorText={erro.inputChaveInscricao}
              inputTextTitle="CHAVE DE CADASTRO"
              security={mostraChave.senhaInvisivel}
              mudaOlho={mostraChave.olho}
              mostraSenha={changeEyeChave}
            />
          </View>
          <CustomButton
            textButton="RECUPERAR SENHA"
            style={{
              backgroundColor: '#FF3366',
              color: '#FFF',
              borderColor: '#FF3366',
            }}
            confirm={recuperarSenha}></CustomButton>
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
  },
  aboutContainer: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
