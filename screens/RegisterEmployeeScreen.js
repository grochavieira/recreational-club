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
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import getRealm from '../services/realm';

export default function RegisterScreen(props) {
  const [dadosFuncionario, setDadosFuncionario] = useState({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    usuario: '',
    senha: '',
    confirmarSenha: '',
    chaveInscricao: '',
  });

  const [erro, setErro] = useState({
    inputNome: '',
    inputEmail: '',
    inputTelefone: '',
    inputUsuario: '',
    inputSenha: '',
    inputConfirmarSenha: '',
    inputChaveInscricao: '',
  });

  const [mostraSenha, setMostraSenha] = useState({
    olho: 'eye-slash',
    senha: true,
  });

  const [mostraConfirmarSenha, setMostraConfirmarSenha] = useState({
    olho: 'eye-slash',
    senha: true,
  });

  const [mostraChave, setMostraChave] = useState({
    olho: 'eye-slash',
    senha: true,
  });

  const [cadastros, setCadastros] = useState([]);

  let funcionarioId = 0;

  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Employee').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  const clickNome = nome => {
    setDadosFuncionario({...dadosFuncionario, nome: nome});
    if (nome != '') {
      setErro({...erro, inputNome: ''});
    }
  };

  const clickEmail = email => {
    setDadosFuncionario({...dadosFuncionario, email: email});
    if (email != '') {
      setErro({...erro, inputEmail: ''});
    }
  };

  const clickTelefone = telefone => {
    setDadosFuncionario({...dadosFuncionario, telefone: telefone});
    if (telefone.length === 11) {
      setErro({...erro, inputTelefone: ''});
    }
  };

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

  const clickConfirmarSenha = confirmarSenha => {
    setDadosFuncionario({...dadosFuncionario, confirmarSenha: confirmarSenha});
    if (confirmarSenha != '' && confirmarSenha === dadosFuncionario.senha) {
      setErro({...erro, inputConfimar: ''});
    }
  };

  const clickChaveInscricao = chaveInscricao => {
    setDadosFuncionario({...dadosFuncionario, chaveInscricao: chaveInscricao});
    if (chaveInscricao != '') {
      setErro({...erro, inputChaveInscricao: ''});
    }
  };

  function clickEyeSenha() {
    if (mostraSenha.olho === 'eye-slash') {
      setMostraSenha({olho: 'eye', senha: false});
    } else {
      setMostraSenha({olho: 'eye-slash', senha: true});
    }
  }

  function clickEyeConfirmarSenha() {
    if (mostraConfirmarSenha.olho === 'eye-slash') {
      setMostraConfirmarSenha({olho: 'eye', senha: false});
    } else {
      setMostraConfirmarSenha({olho: 'eye-slash', senha: true});
    }
  }

  function clickEyeChave() {
    if (mostraChave.olho === 'eye-slash') {
      setMostraChave({olho: 'eye', senha: false});
    } else {
      setMostraChave({olho: 'eye-slash', senha: true});
    }
  }

  async function guardaCadastro() {
    dados = {
      id: funcionarioId,
      nomeCompleto: dadosFuncionario.nome,
      email: dadosFuncionario.email,
      telefone: dadosFuncionario.telefone,
      usuario: dadosFuncionario.usuario,
      senha: dadosFuncionario.senha,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Employee', dados);
    });
  }

  async function cadastra() {
    let verificaErros = 0;
    let mensagemErro = [];

    if (dadosFuncionario.nome === '') {
      verificaErros++;
      mensagemErro[0] = '*Favor preencher campo';
    } else {
      mensagemErro[0] = '';
    }

    if (dadosFuncionario.email === '') {
      verificaErros++;
      mensagemErro[1] = '*Favor preencher campo';
    } else {
      mensagemErro[1] = '';
    }

    if (dadosFuncionario.telefone.length < 11) {
      verificaErros++;
      mensagemErro[2] = '*Campo inserido incorretamente';
    } else {
      mensagemErro[2] = '';
    }

    let usuarioExiste = false;
    cadastros.map(dados => {
      if (dadosFuncionario.usuario === dados.usuario) {
        usuarioExiste = true;
      }
    });

    if (dadosFuncionario.usuario.length < 8) {
      verificaErros++;
      mensagemErro[3] = '*Campo inserido incorretamente (min. 8 caracteres)';
    } else if (usuarioExiste) {
      verificaErros++;
      mensagemErro[3] = '*Esse usuário já existe';
    } else {
      mensagemErro[3] = '';
    }

    if (dadosFuncionario.senha.length < 8) {
      verificaErros++;
      mensagemErro[4] = '*Campo inserido incorretamente (min. 8 caracteres)';
    } else {
      mensagemErro[4] = '';
    }

    if (dadosFuncionario.confirmarSenha != dadosFuncionario.senha) {
      verificaErros++;
      mensagemErro[5] = '*As senhas não são iguais';
    } else {
      mensagemErro[5] = '';
    }

    if (dadosFuncionario.chaveInscricao != 'projetomobile') {
      verificaErros++;
      mensagemErro[6] = '*Chave de inscrição errada';
    } else {
      mensagemErro[6] = '';
    }

    setErro({
      ...erro,
      inputNome: mensagemErro[0],
      inputEmail: mensagemErro[1],
      inputTelefone: mensagemErro[2],
      inputUsuario: mensagemErro[3],
      inputSenha: mensagemErro[4],
      inputConfirmarSenha: mensagemErro[5],
      inputChaveInscricao: mensagemErro[6],
    });
    if (verificaErros === 0) {
      cadastros.map(item => (funcionarioId = item.id + 1));
      await guardaCadastro();
      Alert.alert('Cadastro realizado com sucesso!');
      setDadosFuncionario({});
      props.navigation.push('Login');
    } else {
      Alert.alert('Não foi possível realizar o cadastro!');
    }
  }

  /*
  this.items = cadastros.map(dados => (
    <View
      style={{
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        borderRadius: 5,
        margin: 10,
      }}>
      <Text style={{fontSize: 15, color: '#FF3366'}}>{dados.id}</Text>
      <Text style={{fontSize: 15, color: '#FF3366'}}>{dados.nomeCompleto}</Text>
      <Text style={{fontSize: 15, color: '#FF3366'}}>{dados.email}</Text>
      <Text style={{fontSize: 15, color: '#FF3366'}}>{dados.telefone}</Text>
      <Text style={{fontSize: 15, color: '#FF3366'}}>{dados.senha}</Text>
      <Text style={{fontSize: 15, color: '#FF3366'}}>{dados.usuario}</Text>
    </View>
  ));
*/
  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.principalContainer}>
          <Header textHeader="Cadastro de Funcionário" />

          <View style={styles.principalInputContainer}>
            <Input
              nameIcon="person"
              textPlaceHolder="Digite o seu nome completo"
              length={30}
              value={dadosFuncionario.nome}
              onChange={clickNome}
              inputErrorText={erro.inputNome}
              inputTextTitle="NOME"
            />
            <Input
              nameIcon="email"
              textPlaceHolder="Digite o seu endereço de email"
              length={30}
              value={dadosFuncionario.email}
              onChange={clickEmail}
              inputErrorText={erro.inputEmail}
              inputTextTitle="EMAIL"
            />
            <Input
              nameIcon="phone"
              textPlaceHolder="Digite seu número de tel./cel."
              keyboard="numeric"
              length={11}
              value={dadosFuncionario.telefone}
              onChange={clickTelefone}
              inputErrorText={erro.inputTelefone}
              inputTextTitle="TELEFONE/CELULAR"
            />
            <Input
              nameIcon="account-box"
              textPlaceHolder="Digite o seu login de usuário"
              length={20}
              value={dadosFuncionario.usuario}
              onChange={clickUsuario}
              inputErrorText={erro.inputUsuario}
              inputTextTitle="USUÁRIO"
            />
            <PasswordInput
              nameIcon="lock"
              textPlaceHolder="Digite a sua senha"
              length={16}
              value={dadosFuncionario.senha}
              onChange={clickSenha}
              inputErrorText={erro.inputSenha}
              inputTextTitle="SENHA"
              security={mostraSenha.senha}
              mudaOlho={mostraSenha.olho}
              mostraSenha={clickEyeSenha}
            />
            <PasswordInput
              nameIcon="lock"
              textPlaceHolder="Confirme a sua senha"
              length={16}
              value={dadosFuncionario.confirmarSenha}
              onChange={clickConfirmarSenha}
              inputErrorText={erro.inputConfirmarSenha}
              inputTextTitle="CONFIRMAR SENHA"
              security={mostraConfirmarSenha.senha}
              mudaOlho={mostraConfirmarSenha.olho}
              mostraSenha={clickEyeConfirmarSenha}
            />
            <PasswordInput
              nameIcon="vpn-key"
              textPlaceHolder="Digite a chave para se cadastrar"
              value={dadosFuncionario.chaveInscricao}
              onChange={clickChaveInscricao}
              inputErrorText={erro.inputChaveInscricao}
              inputTextTitle="CHAVE DE CADASTRO"
              security={mostraChave.senha}
              mudaOlho={mostraChave.olho}
              mostraSenha={clickEyeChave}
            />
          </View>

          <CustomButton
            style={{
              backgroundColor: '#FFF',
              color: Colors.primaria,
              borderColor: '#FFF',
            }}
            textButton="CADASTRAR"
            confirm={cadastra}
          />
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
});
