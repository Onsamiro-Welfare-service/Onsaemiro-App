import React, { useState } from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({ navigation }) => {
  const [photo, setPhoto] = React.useState(null);
  const [text, settext] = useState('');
  const [imagetf, setimagetf] = useState(false);
  var userId = "";
  const image = {
    uri: '',
    type: 'imagejpeg',
    name: 'test',
  };
  var imageurl;

  const handleChoosePhoto = async () => {
    await launchCamera({ noData: true }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error ', response.errorCode);
      } else if (response.assets) {
        setPhoto(response);
        setimagetf(true);
      }
    });
  };

  async function handleUploadPhoto(text) {

    if (imagetf == true) {
      image.name = photo.assets[0].fileName;
      image.type = photo.assets[0].type;
      image.uri =
        Platform.OS === 'android'
          ? photo.assets[0].uri
          : photo.assets[0].uri.replace('file://', '');

      const formdata = new FormData();
      formdata.append('photo', image);

      await axios
        .post(
          'http://13.209.212.43/api/upload_photo',
          formdata,
          {
            redirect: 'follow',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data, headers) => {
              return data;
            },
          },
        )
        .then(response => {
          if (response) {
            imageurl = response.data;
            console.log(response.data);
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // error.request is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });


    }
    if (text.trim().length != 0 || imagetf != false) {

      await AsyncStorage.getItem('userId', (err, IdInfo) => {
        console.log(IdInfo);
        userId = IdInfo;
      })
      console.log(userId);
      await axios
        .post(
          'http://13.209.212.43/api/upload_request',
          {
            id: userId,
            is_photo: imagetf,
            text: text,
            photo: imageurl,
          },
        )
        .then(function (response) {
          console.log(response);
          alert('제출이 완료되었습니다.');
          navigation.reset({
            routes: [{
              name: 'MainScreen'
            }]
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.textInput} onChangeText={text => { settext(text); }}
          multiline={true}
          placeholder="필요한 도움을 적어주세요." />
      </View>
      <View style={styles.body}>
        {photo && (<Image source={{ uri: photo.assets[0].uri }} style={styles.image} />)}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => { handleChoosePhoto(text); }}>
          <Text style={styles.Text}>사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { handleUploadPhoto(text); }}>
          <Text style={styles.Text}> 전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'

  },
  footer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    margin: 20,
    paddingHorizontal: 10,
    flex: 1,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    flexDirection: 'row',
  },
  button: {
    width: '100%',
    borderRadius: 25,
    height: '35%',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'skyblue',
  },
  Text: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }

});

export default App;