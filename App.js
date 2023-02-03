import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import cat from './assets/loginimg.png';
import loginform from './code/loginform';
import loading from './code/loading';
import MainScreen from './code/MainScreen';
import Interaction from './code/Interaction';
import Question_Ready from './code/Question_Ready';
import TwoChoice from './code/twoChoice';
import ThreeChoice from './code/threeChoice';
import FourChoice from './code/fourChoice';
import SliderChoice from './code/sliderChoice';

const Stack = createStackNavigator();

class App extends Component {
  logoTitle = () => {
    return <Image style={{width: 40, height: 40}} source={cat} />;
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="loading"
          screenOptions={{ headerShown: false }}
          >
          <Stack.Screen
            name="loading"
            component={loading}
          />
          <Stack.Screen
            name="loginform"
            component={loginform}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            name="TwoChoice"
            component={TwoChoice}
          />
          <Stack.Screen
            name="ThreeChoice"
            component={ThreeChoice}
          />
          <Stack.Screen
            name="FourChoice"
            component={FourChoice}
          />
          <Stack.Screen
            name="SliderChoice"
            component={SliderChoice}
          />
          <Stack.Screen
            name="Interaction"
            component={Interaction}
          />
          <Stack.Screen
            name="Question_Ready"
            component={Question_Ready}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({});

export default App;