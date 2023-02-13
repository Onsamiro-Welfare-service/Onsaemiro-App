import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RNListSlider from 'react-native-list-slider';
import 'react-native-gesture-handler';
import axios from 'axios';


export default class SliderChoice extends Component {
  state = {
    value: 0,
  };

  onValueChanged = value => this.setState({ value });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
        <Text style={styles.tf1}>오늘 기분이 어때요?</Text>
        </View>
        <View style={styles.imogi}></View>
        <View style={styles.text}>
          <Text style={styles.tf2}>Value: {this.state.value}</Text>
        </View>
          <RNListSlider
            value={this.state.value}
            onValueChange={this.onValueChanged}
            arrayLength={120}
          />
        <View style={styles.button}>
          <TouchableOpacity style={styles.bs} onPress={() => alert(`${this.state.value}`)}>
            <Text style={styles.tf2}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    flex: 1,
    alignItems: 'center'
  },
  tf1:{
    fontSize: 40,
    alignItems: 'center'
  },
  tf2:{
    fontSize: 30,
    alignItems: 'center'
  },
  imogi: {
    flex: 3,
    alignItems: 'center'
  },
  text: {
    flex: 1,
    alignItems: 'center'
  },
  slide: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    flex: 1
  },
  bs: {
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor: "skyblue",
    marginTop: 25,
    marginHorizontal: 10,
    alignItems: 'center'
  }
});