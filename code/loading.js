import React from 'react';
import { StyleSheet, Image, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';


export default function AppLoadingForm({navigation}) {

    AsyncStorage.getItem('loginWhether', (err, result) => {
        console.log(result);

        if (result == 'T') {
            navigation.reset({routes: [{name:'MainScreen', params: {
                userIdx: 100,
                userName: 'Gildong',
                userLastName: 'Hong',
            }}]});
        }
        else {
            navigation.reset({routes: [{name:'loginform', params: {
                userIdx: 100,
                userName: 'Gildong',
                userLastName: 'Hong',
            }}]});
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.image} source={require("./../assets/loginimg.png")} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },

    image: {
        height: '36%',
        width: '100%',
        resizeMode: 'cover'
    },

})