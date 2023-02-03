import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import 'react-native-gesture-handler';


var questbtn = "문진";
var interbtn = "요청";

export default class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.props.navigation.navigate('Question_Ready');
          }}>
            <Image style={styles.image} source={require('./../assets/checkList.png')} />
            <Text style={styles.title}>{`${questbtn}`}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            this.props.navigation.navigate('Interaction');
          }}>
            <Image style={styles.image} source={require('./../assets/interactionHelp.png')} />
            <Text style={styles.title}>{`${interbtn}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  footer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    marginBottom: 10,
    borderRadius: 25
  },
  image: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
    borderRadius: 35
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
});