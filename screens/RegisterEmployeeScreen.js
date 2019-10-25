import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/colors';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import getRealm from '../services/realm';

export default function RegisterScreen(props) {
  // Guarda os dados de input do funcionário para cadastro
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

  // Guarda as mensagens de erro se o usuário errar em algum input
  const [erro, setErro] = useState({
    inputNome: '',
    inputEmail: '',
    inputTelefone: '',
    inputUsuario: '',
    inputSenha: '',
    inputConfirmarSenha: '',
    inputChaveInscricao: '',
  });

  // Guarda a troca de icones do olho e se a senha será mostrada ou não (senha)
  const [mostraSenha, setMostraSenha] = useState({
    olho: 'eye-slash',
    senhaInvisivel: true,
  });

  const [mostraConfirmarSenha, setMostraConfirmarSenha] = useState({
    olho: 'eye-slash',
    senhaInvisivel: true,
  });

  const [mostraChave, setMostraChave] = useState({
    olho: 'eye-slash',
    senhaInvisivel: true,
  });

  // Guarda os cadastros no banco de dados
  const [cadastros, setCadastros] = useState([]);

  // Será utilizado para guarda o próximo id de cadastro disponível
  let idDisponivelFuncionario = 0;

  // Roda uma vez quando entra nessa tela para pegar os cadastros do banco de dados
  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Employee').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  // muda o nome digitado pelo usuário, e reseta a mensagem de erro se as condições forem alcançadas
  const changeNome = nome => {
    setDadosFuncionario({...dadosFuncionario, nome: nome});
    if (nome != '') {
      setErro({...erro, inputNome: ''});
    }
  };

  const changeEmail = email => {
    setDadosFuncionario({...dadosFuncionario, email: email});
    if (email != '') {
      setErro({...erro, inputEmail: ''});
    }
  };

  // Aqui também verifica se os dados digitados são apenas números, se não, ele apaga
  const changeTelefone = telefone => {
    let novoTexto = '';
    let numeros = '0123456789';

    for (var i = 0; i < telefone.length; i++) {
      if (numeros.indexOf(telefone[i]) > -1) {
        novoTexto = novoTexto + telefone[i];
      } else {
      }
    }
    setDadosFuncionario({...dadosFuncionario, telefone: novoTexto});
    if (telefone.length === 11) {
      setErro({...erro, inputTelefone: ''});
    }
  };

  const changeUsuario = usuario => {
    setDadosFuncionario({...dadosFuncionario, usuario: usuario});
    if (usuario.length >= 8) {
      setErro({...erro, inputUsuario: ''});
    }
  };

  const changeSenha = senha => {
    setDadosFuncionario({...dadosFuncionario, senha: senha});
    if (senha.length >= 8) {
      setErro({...erro, inputSenha: ''});
    }
  };

  const changeConfirmarSenha = confirmarSenha => {
    setDadosFuncionario({...dadosFuncionario, confirmarSenha: confirmarSenha});
    if (confirmarSenha != '' && confirmarSenha === dadosFuncionario.senha) {
      setErro({...erro, inputConfimar: ''});
    }
  };

  const changeChaveInscricao = chaveInscricao => {
    setDadosFuncionario({...dadosFuncionario, chaveInscricao: chaveInscricao});
    if (chaveInscricao != '') {
      setErro({...erro, inputChaveInscricao: ''});
    }
  };

  // Muda o icone do olho, tornando a senha visível ou invísivel
  function changeEyeSenha() {
    if (mostraSenha.olho === 'eye-slash') {
      setMostraSenha({olho: 'eye', senhaInvisivel: false});
    } else {
      setMostraSenha({olho: 'eye-slash', senhaInvisivel: true});
    }
  }

  function changeEyeConfirmarSenha() {
    if (mostraConfirmarSenha.olho === 'eye-slash') {
      setMostraConfirmarSenha({olho: 'eye', senhaInvisivel: false});
    } else {
      setMostraConfirmarSenha({olho: 'eye-slash', senhaInvisivel: true});
    }
  }

  function changeEyeChave() {
    if (mostraChave.olho === 'eye-slash') {
      setMostraChave({olho: 'eye', senhaInvisivel: false});
    } else {
      setMostraChave({olho: 'eye-slash', senhaInvisivel: true});
    }
  }

  // Verifica se existem erros e cadastra se as condições minímas foram alcançadas
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
      cadastros.map(item => (idDisponivelFuncionario = item.id + 1)); // Pega o próximo id disponível
      await guardaCadastro(); // Espera o cadastro ser realizado
      Alert.alert('Cadastro realizado com sucesso!');
      props.navigation.pop(); // Volta para a tela de login
    } else {
      Alert.alert('Não foi possível realizar o cadastro!');
    }
  }

  // Pega os dados de cadastro e manda eles para o banco de dados
  async function guardaCadastro() {
    dados = {
      id: idDisponivelFuncionario,
      nomeCompleto: dadosFuncionario.nome,
      email: dadosFuncionario.email,
      telefone: dadosFuncionario.telefone,
      usuario: dadosFuncionario.usuario,
      senha: dadosFuncionario.senha,
    };

    // Pega o banco de dados
    const realm = await getRealm();

    // Abre o banco de dados para inserir dados nele
    realm.write(() => {
      realm.create('Employee', dados); // Cria um novo cadastro de funcionários com os dados inseridos
    });
  }

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
              onChange={changeNome}
              inputErrorText={erro.inputNome}
              inputTextTitle="NOME"
            />
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
              nameIcon="phone"
              textPlaceHolder="Digite seu número de tel./cel."
              keyboard="numeric"
              length={11}
              value={dadosFuncionario.telefone}
              onChange={changeTelefone}
              inputErrorText={erro.inputTelefone}
              inputTextTitle="TELEFONE/CELULAR"
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
              nameIcon="lock"
              textPlaceHolder="Digite a sua senha"
              length={16}
              value={dadosFuncionario.senha}
              onChange={changeSenha}
              inputErrorText={erro.inputSenha}
              inputTextTitle="SENHA"
              security={mostraSenha.senhaInvisivel}
              mudaOlho={mostraSenha.olho}
              mostraSenha={changeEyeSenha}
            />
            <PasswordInput
              nameIcon="lock"
              textPlaceHolder="Confirme a sua senha"
              length={16}
              value={dadosFuncionario.confirmarSenha}
              onChange={changeConfirmarSenha}
              inputErrorText={erro.inputConfirmarSenha}
              inputTextTitle="CONFIRMAR SENHA"
              security={mostraConfirmarSenha.senhaInvisivel}
              mudaOlho={mostraConfirmarSenha.olho}
              mostraSenha={changeEyeConfirmarSenha}
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
