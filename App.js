import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Modal
} from "react-native";

import Constants from 'expo-constants';

async function executeGet(url, jsonState){
  // get sincrono com o uso do fetch
  await fetch(url)
  .then(response => {
    if (response.status === 200) {
      // console.log('Sucesso')
      response.json().then(function(result){
        // console.log(result)
        jsonState(result)
      });
    } else{
      throw new Error('Erro ao consumir a API')
    }
  })
  .then(response => {
    //console.debug(response);
  }).catch(error => {
    console.error(error)
  });
}

const ShowDetalhes = ({ display, toogleModal, mensagem }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={display}
    onRequestClose={toogleModal}
  >

    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable onPress={toogleModal}>
          <Text>{mensagem}</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
)

const Pessoa = ({ name, email }) => {
  const [modal, setModal] = React.useState(false)

  function mudaModal() {
    setModal(!modal)
  }

  return (
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={email} />

      <Pressable onPress={mudaModal}>
        <Text style={styles.paragraph}>{name}</Text>
      </Pressable>
    </View>
  )
}


export default function App() {
  
  const header = () => {
    return <Text style={styles.cabecalho}>Consumindo API do JSON Place Holder</Text>
  };
  
  const [jsonData, setJsonData] = React.useState([])

  useEffect(() => {
    executeGet("https://jsonplaceholder.typicode.com/users", setJsonData)
  }, [])

  function meuItem({item}){       
    return(
      <Pessoa name={item.name} 
              username={item.username}
              email={item.email}
      />
    )
  } 

  return (
    <View style={styles.container}>
      <FlatList
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={header}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#5F9EA0',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'pink'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#B0C4DE",
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
    shadowColor: "#87CEEB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cabecalho:{
    margin: 12,
    padding: 10,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#008B8B",
    color: 'white'
  }
});