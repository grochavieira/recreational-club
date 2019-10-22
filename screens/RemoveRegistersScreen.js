import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text, FlatList} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FlatListItem from '../components/FlatListItem';
import Colors from '../constants/colors';
import Search from '../components/Search';
import Header from '../components/Header';
import getRealm from '../services/realm';

export default function RegisterScreen(props) {
  const [cadastros, setCadastros] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [nomeAssociado, setNomeAssociado] = useState('');

  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Associate').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  async function perguntaParaRemover(idAssociado) {
    Alert.alert(
      'Remover Associado',
      'Tem certeza que deseja excluir esse associado?',
      [
        {text: 'SIM', onPress: remove.bind(this, idAssociado)},
        {text: 'NÃO', onPress: () => {}},
      ],
    );
  }
  async function remove(idAssociado) {
    setCadastros(cadastrosAtuais => {
      return cadastrosAtuais.filter(cadastro => cadastro.id !== idAssociado);
    });
    const realm = await getRealm();
    realm.write(() => {
      let remover = realm.create(
        'Associate',
        {
          id: idAssociado,
          nomeCompleto: '',
          email: '',
          telefone: '',
          numDependentes: '',
          sexo: '',
        },
        true,
      );

      realm.delete(remover);
    });
    Alert.alert('Associado removido com sucesso!');
  }

  async function buscaAssociado() {
    const realm = await getRealm();
    const dadosFiltrados = realm
      .objects('Associate')
      .filtered(`nomeCompleto == "${nomeAssociado}"`);
    if (dadosFiltrados.length === 0) {
      Alert.alert('Esse nome não existe!');
    } else {
      setCadastros(dadosFiltrados);
      setRefresh(!refresh);
    }
  }

  async function listaTodosAssociados() {
    const realm = await getRealm();
    const todosAssociados = realm.objects('Associate').sorted('id', false);
    setCadastros(todosAssociados);
    setRefresh(!refresh);
  }

  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <Header textHeader="Remover Associados" />
      <Search
        length={30}
        value={nomeAssociado}
        onChange={setNomeAssociado}
        onClickSearchName={buscaAssociado}
        inputTextTitle="PESQUISAR ASSOCIADO"
        nameIcon="account-circle"
        textPlaceHolder="Digite um nome p/ pesquisar"
        searchColor="#FF3366"
        searchAllText={{color: '#FF3366'}}
        onClickListAll={listaTodosAssociados}
      />
      <View style={styles.principalContainer}>
        <FlatList
          style={{marginBottom: 260, width: '100%'}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={cadastros}
          renderItem={itemData => (
            <FlatListItem
              styleContainer={{backgroundColor: '#FF3366'}}
              styleText={{color: '#FF3366'}}
              key={itemData.item.id}
              id={itemData.item.id}
              nomeAssociado={itemData.item.nomeCompleto}
              emailAssociado={itemData.item.email}
              telefoneAssociado={itemData.item.telefone}
              aniversarioAssociado={itemData.item.aniversario}
              sexoAssociado={itemData.item.sexo}
              numDependentesAssociado={itemData.item.numDependentes}
              visitasAssociado="0"
              nomeBotao="REMOVER"
              nomeIcone="delete"
              iconColor="#FF3366"
              onAction={perguntaParaRemover}
            />
          )}
        />
      </View>
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
});
