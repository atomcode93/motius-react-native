import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Navigator, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

class TitleText extends React.Component {
  render() {
    return (
      <Text style={styles.text1}>
        {this.props.label}
      </Text>
    )
  }
}

export class Introduction extends React.Component {

  navigate(rounteName) { // TODO: Typo
    this.props.navigator.push({ name: rounteName });
  }

  static navigationOptions = {
      title: 'Introduction'
  }

  viewStyle() {
    return {
      flex: 1,
      //backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  render() {
    return (
      <View>
      <Swiper style={styles.wrapper} height={height*0.9} loop={false} >
        <View style={styles.slide1}>
          <Text style={styles.text}>Welcome to Motius</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Check your Contract</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Check your Time</Text>
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text}>Check your Money</Text>
        </View>
      </Swiper>
      <Button title="Skip" onPress={this.onSkipPress.bind(this)}>
      </Button>
      </View>
    )
  }
  onSkipPress() {
    this.navigate('landing');
  }

}

var {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text1: {
    fontSize: 48,
    color: 'black'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
