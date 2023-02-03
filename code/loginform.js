import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';




export default function App({ navigation }) {
  const [loginCode, setloginCode] = useState("");

  async function login(userCode) {
    const response = await axios.post("http://13.209.212.43/api/user_login", {
        code: userCode
    })
    const userId = response.data;
    if (userId == 0) {
      alert('다시 시도해주세요');
      AsyncStorage.setItem('loginWhether', 'F');
    }
    else if (userId == 3) {
      alert('다시 시도해주세요');
      AsyncStorage.setItem('loginWhether', 'F');
    }
    else {
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('loginWhether', 'T');
      
      AsyncStorage.getItem('loginWhether', (err, result) => {
        console.log(result);

        if (result == 'T') {
            navigation.reset({routes: [{name:'loading', params: {
                userIdx: 100,
                userName: 'Gildong',
                userLastName: 'Hong',
            }}]});
        }
    });
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.loginImage}>
        <Image style={styles.image} source={require("./../assets/loginimg.png")} />
      </View>
      <View style={styles.loginEvent}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="loginCode"
            placeholderTextColor="#003f5c"
            onChangeText={(loginCode) => setloginCode(loginCode)}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={() => login(loginCode)}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },

  loginImage: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginEvent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "100%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "skyblue",
  },
  image: {
    marginTop: 100,
    height: '40%',
    width: '100%',
    resizeMode: 'cover'
  }
});