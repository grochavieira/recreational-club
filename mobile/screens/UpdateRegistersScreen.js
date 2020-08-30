import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, FlatList} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FlatListItem from '../components/FlatListItem';
import Colors from '../constants/colors';
import Header from '../components/Header';
import getRealm from '../services/realm';
import Search from '../components/Search';

export default function RegisterScreen(props) {
  const [cadastros, setCadastros] = useState([]); // Guarda os dados de cadastro do associado
  const [refresh, setRefresh] = useState(false); // Variavel para atualizar a FlatList
  const [nomeAssociado, setNomeAssociado] = useState(''); // Pega o input do nome para pesquisar os cadastros de associado

  // Pega os cadastros de associados no banco de dados
  async function carregaCadastros() {
    const realm = await getRealm();

    const dados = realm.objects('Associate').sorted('id', false);

    setCadastros(dados);
  }

  // Roda uma vez quando entra nessa tela
  useEffect(() => {
    carregaCadastros();
  }, []);

  // Manda os dados a serem atualizados do associado escolhido para a tela de editar cadastros
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
          nascimento: dados.nascimento,
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

  // Busca por um associado por meio do seu nome e atualiza a FlatList se esse associado existir
  async function buscaAssociado() {
    const realm = await getRealm(); // Pega o banco de dados
    const dadosFiltrados = realm
      .objects('Associate')
      .filtered(`nomeCompleto == "${nomeAssociado}"`); // Filtra o banco para achar associados com esse nome
    if (dadosFiltrados.length === 0) {
      // Verifica se existem associados com esse nome
      Alert.alert('Esse nome não existe!');
    } else {
      setCadastros(dadosFiltrados); // Atualiza cadastros que está ligada à FlatList
      setRefresh(!refresh); // Atualiza a própria FlatList
    }
  }

  // Busca todos os cadastros do banco e atualiza a FlatList
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
          data={
            cadastros
          } /* Dados que serão destrinchados e renderizados na FlatList*/
          extraData={
            refresh
          } /* Variável que atualiza a FlatList quando alterada */
          renderItem={itemData => (
            <FlatListItem
              key={itemData.item.id}
              idAssociado={itemData.item.id}
              nomeAssociado={itemData.item.nomeCompleto}
              emailAssociado={itemData.item.email}
              telefoneAssociado={itemData.item.telefone}
              nascimentoAssociado={itemData.item.nascimento}
              sexoAssociado={itemData.item.sexo}
              numDependentesAssociado={itemData.item.numDependentes}
              visitasAssociado={itemData.item.numVisitas}
              nomeBotao="ATUALIZAR"
              nomeIcone="refresh"
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
