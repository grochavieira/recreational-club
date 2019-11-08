import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import FlatListItem from '../components/FlatListItem';
import Colors from '../constants/colors';
import Search from '../components/Search';
import Header from '../components/Header';
import getRealm from '../services/realm';

export default function RegisterScreen(props) {
  const [cadastros, setCadastros] = useState([]); // Guarda os cadastros do banco de dados
  const [refresh, setRefresh] = useState(false); // Variável para atualizar a FlatList
  const [nomeAssociado, setNomeAssociado] = useState(''); // Guarda o nome digitado para buscar por um associado existente

  // Roda a primeira vez que entra na tela para guardar todos os registros do banco de dados dos associados
  useEffect(() => {
    async function carregaCadastros() {
      const realm = await getRealm();

      const dados = realm.objects('Associate').sorted('id', false);

      setCadastros(dados);
    }

    carregaCadastros();
  }, []);

  // Pergunta antes de remover um cadastro
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

  // Remove o cadastro escolhido
  async function remove(idAssociado) {
    setCadastros(cadastrosAtuais => {
      return cadastrosAtuais.filter(cadastro => cadastro.id !== idAssociado);
    });
    const realm = await getRealm();
    realm.write(() => {
      // Pega o cadastro igual ao id do associado escolhido para ser deletado
      const cadastroSelecionado = realm
        .objects('Associate')
        .filtered(`id == "${idAssociado}"`);

      // deleta o associado escolhido
      realm.delete(cadastroSelecionado);
    });
    Alert.alert('Associado removido com sucesso!');
  }

  // Faz uma busca pelo nome digitado e atualiza a FlatList retornando os cadastros que tem esse nome
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

  // Busca todos os associados cadastrados e atualiza a FlatList com esses cadastros
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
          data={
            cadastros
          } /* Dados que serão destrinchados e renderizados pela FlatList */
          extraData={
            refresh
          } /* Variável que atualiza a FlatList quando alterada */
          renderItem={itemData => (
            <FlatListItem
              styleContainer={{backgroundColor: '#FF3366'}}
              styleText={{color: '#FF3366'}}
              key={itemData.item.id}
              idAssociado={itemData.item.id}
              nomeAssociado={itemData.item.nomeCompleto}
              emailAssociado={itemData.item.email}
              telefoneAssociado={itemData.item.telefone}
              nascimentoAssociado={itemData.item.nascimento}
              sexoAssociado={itemData.item.sexo}
              numDependentesAssociado={itemData.item.numDependentes}
              visitasAssociado={itemData.item.numVisitas}
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
