import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, FlatList} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import PlainFlatListItem from '../components/PlainFlatListItem';
import Colors from '../constants/colors';
import Header from '../components/Header';
import getRealm from '../services/realm';
import Search from '../components/Search';

export default function ListRegisterScreen(props) {
  const [cadastros, setCadastros] = useState([]); // Guarda os cadastros do banco de dados
  const [refresh, setRefresh] = useState(false); // Variavel para atualizar a FlatList
  const [nomeAssociado, setNomeAssociado] = useState(''); // Guarda o input de nome para a busca de associados

  // Pega os cadastros do banco de dados do banco de dados de associados
  async function carregaCadastros() {
    const realm = await getRealm();

    const dados = realm.objects('Associate').sorted('id', false);

    setCadastros(dados);
  }

  // Roda a primeira vez que entra nessa tela para pegar os dados de cadastro no banco
  useEffect(() => {
    carregaCadastros();
  }, []);

  // Verifica se o nome digitado existe e retorna o cadastro desse nome se existir no banco
  async function buscaAssociado() {
    const realm = await getRealm(); // Pega o banco de dados
    const dadosFiltrados = realm
      .objects('Associate')
      .filtered(`nomeCompleto == "${nomeAssociado}"`); // Filtra o banco verificando quais cadastros tem o nome que foi pesquisado
    if (dadosFiltrados.length === 0) {
      // Se não existirem dados
      Alert.alert('Esse nome não existe!'); // Exibe uma mensagem de erro
    } else {
      setCadastros(dadosFiltrados); // Atualiza os dados de cadastro para a FlatList
      setRefresh(!refresh); // Atualiza a própria FlatList
    }
  }

  // Pega todos os cadastros do banco para mostrar na FlatList
  async function listaTodosAssociados() {
    const realm = await getRealm();
    const todosAssociados = realm.objects('Associate').sorted('id', false); // Pega todos os cadastros em ordem crescente de id
    setCadastros(todosAssociados);
    setRefresh(!refresh);
  }

  return (
    <LinearGradient
      colors={[Colors.primaria, Colors.secundaria]}
      style={styles.cor}>
      <Header textHeader="Listar Associados" />
      <Search
        length={30}
        value={nomeAssociado}
        onChange={setNomeAssociado}
        onClickSearchName={buscaAssociado}
        inputTextTitle="PESQUISAR ASSOCIADO"
        nameIcon="account-circle"
        textPlaceHolder="Digite um nome p/ pesquisar"
        searchColor="#3454D1"
        searchAllText={{color: '#3454D1'}}
        onClickListAll={listaTodosAssociados}
      />
      <View style={styles.principalContainer}>
        <FlatList
          style={{marginBottom: 260, width: '100%'}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={cadastros} /* Os dados que serão mostrados na FlatList */
          extraData={
            refresh
          } /* Variável que atualiza a FlatList quando é alterada */
          renderItem={(
            itemData /* Desestrutura os dados dos cadastros para manda-los para cada item da FlatList */,
          ) => (
            <PlainFlatListItem
              styleContainer={{backgroundColor: '#3454D1'}}
              key={itemData.item.id}
              idAssociado={itemData.item.id}
              nomeAssociado={itemData.item.nomeCompleto}
              emailAssociado={itemData.item.email}
              telefoneAssociado={itemData.item.telefone}
              nascimentoAssociado={itemData.item.nascimento}
              sexoAssociado={itemData.item.sexo}
              numDependentesAssociado={itemData.item.numDependentes}
              visitasAssociado={itemData.item.numVisitas}
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
