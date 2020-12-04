import { StatusBar } from 'expo-status-bar';
import React, { Component,useState,useEffect } from 'react';
import api from './src/services/api';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  AsyncStorage,

} from 'react-native';





export default function App() {

 const  [ projects,setProjects] = useState([]);
 const [ errorMessage,setErrorMessage] = useState('');


 useEffect(()=>{
  
  api.get('/projetos').then(response=>{
    setProjects(response.data);
  }).catch(error =>{setErrorMessage(error.data.error)})

 
},[]); 
 
  return (
    <View style={styles.container}>
    { !!errorMessage && <Text>{errorMessage}</Text> }

    { projects.map(project => (
      <View key={project.id} style={{ marginTop: 15 }}>
        <Text style={{ fontWeight: 'bold' }}>{project.title}</Text>
        <Text>{project.url}</Text>
      </View>
    ))}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
