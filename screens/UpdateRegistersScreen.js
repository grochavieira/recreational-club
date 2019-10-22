import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Alert, FlatList, Button} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FlatListItem from '../components/FlatListItem';
import Colors from '../constants/colors';
import Header from '../components/Header';
import getRealm from '../services/realm';
import Search from '../components/Search';

export default function RegisterScreen(props) {
  const [cadastros, setCadastros] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [nomeAssociado, setNomeAssociado] = useState('');

  async function carregaCadastros() {
    const realm = await getRealm();

    const dados = realm.objects('Associate').sorted('id', false);

    setCadastros(dados);
  }

  useEffect(() => {
    carregaCadastros();
  }, []);

  function atualiza(idAssociado) {
    let dadosAssociado = {};
    cadastros.map(dados => {
      if (idAssociado === dados.id) {
        dadosAssociado = {
          id: dados.id,
          nome: dados.nomeCompleto,
          email: dados.email,
          telefone: dados.telefone,
          numDependentes: dados.numDependentes,
          aniversario: dados.aniversario,
          sexo: dados.sexo,
          numVisitas: dados.numVisitas,
        };
      }
    });
    props.navigation.push('EditRegister', {
      dadosAssociado: dadosAssociado,
      listaTodosAssociados: listaTodosAssociados,
      setRefresh: setRefresh,
      refresh: refresh,
    });
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
      <Header textHeader="Atualizar Associados" />
      <Search
        length={30}
        value={nomeAssociado}
        onChange={setNomeAssociado}
        onClickSearchName={buscaAssociado}
        inputTextTitle="PESQUISAR ASSOCIADO"
        nameIcon="account-circle"
        textPlaceHolder="Digite um nome p/ pesquisar"
        searchColor={Colors.primaria}
        onClickListAll={listaTodosAssociados}
      />
      <View style={styles.principalContainer}>
        <FlatList
          style={{marginBottom: 260, width: '100%'}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={cadastros}
          extraData={refresh}
          renderItem={itemData => (
            <FlatListItem
              key={itemData.item.id}
              id={itemData.item.id}
              nomeAssociado={itemData.item.nomeCompleto}
              emailAssociado={itemData.item.email}
              telefoneAssociado={itemData.item.telefone}
              aniversarioAssociado={itemData.item.aniversario}
              sexoAssociado={itemData.item.sexo}
              numDependentesAssociado={itemData.item.numDependentes}
              visitasAssociado={itemData.item.numVisitas}
              nomeBotao="ATUALIZAR"
              nomeIcone="update"
              iconColor={Colors.primaria}
              onAction={atualiza}
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
