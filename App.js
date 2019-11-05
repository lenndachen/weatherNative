/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import moment from "moment";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
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
            userEnteredZip: '',
            map: '',
            forecast: [],
            tomorrow: [],
            next1: [],
            next2: [],
            next3: [],
            next4: [],
        }
    }

    componentDidMount(){

    }

    submit = (userZip) => {
        this.getCurrent(userZip);
        this.getMap(userZip);
        this.getForecast(userZip);
    }

    getCurrent = (userInput) => {
         let zipCode = userInput;
         let apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&APPID=b2a6c5863316c58e6a97c6a48e78ca12";
         fetch(apiUrl)
         .then(response => response.json())
         .then(responseData => {
             this.setState({
                 data: responseData,
                 city: responseData.name,
                 temp: this.convertToFarenheit(responseData.main.temp),
                 condition: responseData.weather[0].description,
                 sunrise: moment.unix(responseData.sys.sunrise).format("HH:mm"),
                 sunset: moment.unix(responseData.sys.sunset).format("HH:mm"),
             })
         })
    }

    convertToFarenheit = (x) => {
        let kelvin = x - 273.15;
        let farenheit = kelvin * 9/5 + 32;
        let rounded = Math.round( farenheit * 10 ) / 10
        return rounded;
    }

    getMap = (userInput) => {
        let map = {
          uri: 'https://maps.googleapis.com/maps/api/staticmap?center='+userInput+'&zoom=11&size=350x350&key=AIzaSyD2LfBTFUaTpYMG6lG6Zh-Ta-_cMhxjuNU'
        }
        this.setState({
          map: map,
        })
    }

    getForecast = (userInput) => {
      let zipCode = userInput;
      let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip="+zipCode+",us&APPID=b2a6c5863316c58e6a97c6a48e78ca12";
      fetch(apiUrl)
      .then(response => response.json())
      .then(responseData => {           
        let forecastData = [];
        for (let i=0; i<responseData.list.length; i++) {
          let date = responseData.list[i].dt_txt;
          let splitDate = date.split("-");
          let splitOffTime = splitDate[2].split(" ");
          let month = splitDate[1];
          let time = splitOffTime[1];
          let day = splitOffTime[0];
          let year = splitDate[0];
          let newFormat = month + "-" + day + "-" + year;
          let temp = this.convertToFarenheit(responseData.list[i].main.temp);
          let condition = responseData.list[i].weather[0].description;
          let icon = responseData.list[i].weather[0].icon;

          forecastData.push(day);
          forecastData.push(newFormat);    
          forecastData.push(temp);    
          forecastData.push(condition);    
          forecastData.push(icon);  
          forecastData.push(time);
        }           

        this.setState({
          forecast: forecastData,             
        })
      })
    }

    tomorrowArray = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let tomorrowNum = today+1;
        let tomorrow = tomorrowNum.toString();
        if (tomorrow.length < 2) {
          tomorrow = "0"+tomorrowNum.toString();
        } else {
          tomorrow = tomorrowNum.toString();
        }
        let tomorrowIndex = forecastArray.indexOf(tomorrow);
        let tomorrowArray = forecastArray.slice(tomorrowIndex, tomorrowIndex+48);
        let temps = this.checkTemps(tomorrowArray);
        let tomorrowData = [tomorrowArray[1], temps[1], temps[0], forecastArray[3]];
        return tomorrowData;
    }

    next1Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next1Num = today+2;
        let next1 = next1Num.toString();
        if (next1.length < 2) {
          next1 = "0"+next1Num.toString();
        } else {
          next1 = next1Num.toString();
        }
        let next1Index = forecastArray.indexOf(next1);
        let next1Array = forecastArray.slice(next1Index, next1Index+48);
        let temps = this.checkTemps(next1Array);
        let next1Data = [next1Array[1], temps[1], temps[0], forecastArray[9]];
        return next1Data;
    }

    next2Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next2Num = today+3;
        let next2 = next2Num.toString();
        if (next2.length < 2) {
          next2 = "0"+next2Num.toString();
        } else {
          next2 = next2Num.toString();
        }
        let next2Index = forecastArray.indexOf(next2);
        let next2Array = forecastArray.slice(next2Index, next2Index+48);
        let temps = this.checkTemps(next2Array);
        let next2Data = [next2Array[1], temps[1], temps[0], forecastArray[15]];
        return next2Data;
    }

    next3Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next3Num = today+4;
        let next3 = next3Num.toString();
        if (next3.length < 2) {
          next3 = "0"+next3Num.toString();
        } else {
          next3 = next3Num.toString();
        }
        let next3Index = forecastArray.indexOf(next3);
        let next3Array = forecastArray.slice(next3Index, next3Index+48);
        let temps = this.checkTemps(next3Array);
        let next3Data = [next3Array[1], temps[1], temps[0], forecastArray[21]];
        return next3Data;
    }

    next4Array = (forecastArray) => {
        let today = parseInt(forecastArray[0]);
        let next4Num = today+4;
        let next4 = next4Num.toString();
        if (next4.length < 2) {
          next4 = "0"+next4Num.toString();
        } else {
          next4 = next4Num.toString();
        }
        let next4Index = forecastArray.indexOf(next4);
        let next4Array = forecastArray.slice(next4Index, next4Index+48);
        let temps = this.checkTemps(next4Array);
        let next4Data = [next4Array[1], temps[1], temps[0], forecastArray[27]];
        return next4Data;
    }

    checkTemps = (dayArray) => {
        let dayData = dayArray;
        function checkNums(num) {
            return num >= -100;
        }
        let temps = dayData.filter(checkNums);
        temps.splice(0,1);
        temps.splice(1,1);
        temps.splice(2,1);
        temps.splice(3,1);
        temps.splice(4,1);
        temps.splice(5,1);
        temps.splice(6,1);
        temps.splice(7,1);
        let low = Math.min(temps[0], temps[1], temps[2], temps[3], temps[4], temps[5], temps[6], temps[7]);
        let high = Math.max(temps[0], temps[1], temps[2], temps[3], temps[4], temps[5], temps[6], temps[7]);
        let lowHigh = [low, high];
        return lowHigh;
    }

    render() {
        let mapUri = this.state.map;
        console.log("forecast data: ", this.state.forecast);

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
                        onChangeText={(text) => this.setState({userEnteredZip: text})}
                        keyboardType='number-pad'
                        value={this.state.userEnteredZip}
                        clearTextOnFocus='true'
                        >
                    </TextInput>
                    
                    <Button
                        onPress={() => this.submit(this.state.userEnteredZip)}
                        title="submit"
                    > Submit </Button>
                </View>

                <View style={{flex:1, alignItems:'center', margin: 20}}>
                    <Image source={mapUri} style={{width:200, height:200}}/>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Current Forecast</Text>
                  <Current 
                    city={this.state.city} 
                    temp={this.state.temp} 
                    condition={this.state.condition} 
                    sunrise={this.state.sunrise} 
                    sunset={this.state.sunset}
                  />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>5 Day Forecast</Text>
                    {this.state.forecast !== [] && <Forecast 
                    forecast={this.state.forecast}
                    tomorrow={this.tomorrowArray(Object.assign(this.state.forecast))}
                    next1={this.next1Array(Object.assign(this.state.forecast))}
                    next2={this.next2Array(Object.assign(this.state.forecast))}
                    next3={this.next3Array(Object.assign(this.state.forecast))}
                    next4={this.next4Array(Object.assign(this.state.forecast))}
                    />}
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
    marginTop: 20,
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