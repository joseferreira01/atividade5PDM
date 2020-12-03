import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
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

  state = {
    errorMessage: '',
    projects: [],
  };
  getProjectList = async () => {
    try {
      const response = await api.get('/projetos');

      const { projects } = response.data;
      console.log('projetos',projects)

      this.setState({ projects });
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };
  return (
    <View style={styles.container}>
    { !!this.state.errorMessage && <Text>{this.state.errorMessage}</Text> }
    { 
       <Button onPress={this.getProjectList} title="Carregar projetos" />
      }

    { this.state.projects.map(project => (
      <View key={project._id} style={{ marginTop: 15 }}>
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
