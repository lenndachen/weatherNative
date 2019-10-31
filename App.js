/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Current from "react-native/Libraries/Components/CurrentWeather/index.js";
import Forecast from "react-native/Libraries/Components/Forecast/index.js";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userInput: '',
        }
    }

    render() {
        let pic = {
            uri: 'https://maps.googleapis.com/maps/api/staticmap?center='+this.state.userInput+'&zoom=11&size=350x350&key=AIzaSyD2LfBTFUaTpYMG6lG6Zh-Ta-_cMhxjuNU',
        }
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>
              <Text style={styles.appTitle}>Weather App</Text>
                <View style={styles.sectionContainer}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Enter zip code..."
                        onChangeText={(userInput) => this.setState({userInput})}
                        value={this.state.userInput}
                    />
                </View>

                <View style={{flex:1, alignItems:'center'}}>
                    <Image source={pic} style={{width:200, height:200}}/>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Current Forecast</Text>
                  <Current />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>5 Day Forecast</Text>
                  <Forecast />
                </View>            
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      );
    };
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;