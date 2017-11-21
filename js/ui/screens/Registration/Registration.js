import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Navigator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner, Input, Card, CardSection, Button } from '../../components'

export class Registration extends React.Component {

  navigate(rounteName) { // TODO: Typo
    this.props.navigator.push({ name: rounteName });
  }

  static navigationOptions = {
    title: 'Registration'
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={
                require('../../assets/motius.png') // TODO: Ask me how you can manage resources more effectively than by always referencing the path.
              }
            />
            <Text style={styles.title}>
              Motius
            </Text>
          </View>
          <View>
            <Text style={styles.message}>
              Registration is not available at the moment.
            </Text>
            <Button style={styles.button} onPress={this.onGoBackPress.bind(this)}>
              Go Back
            </Button>
          </View>
          <Card>
            <CardSection>
              <Input
                label="First Name"
                placeholder="First Name"
                returnKeyType="next"
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Input
                label="Last Name"
                placeholder="Last Name"
                returnKeyType="next"
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Input
                label="Email"
                placeholder="Email Address"
                returnKeyType="next"
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Input
                label="Mobile"
                placeholder="Mobile Number"
                returnKeyType="next"
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Input
                label="Password"
                placeholder="Your Password"
                returnKeyType="next"
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Input
                label="Password"
                placeholder="Please Repeat Password"
                returnKeyType="next"
              />
            </CardSection>
          </Card>
          <Button style={styles.button}>
            Register
          </Button>
        </KeyboardAwareScrollView>
      </View>

    )
  }
  onGoBackPress() {
    this.navigate('landing');
  }
}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  logoContainer: {
    flex: 1,
    height: height / 3, // TODO: Width and height can change on runtime (for instance, when the device is rotated). Always query Dimensions.get and set the style in the render function. Also, I think in this case you should not pass an explicit height value, but rather just use flex to set the height.
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 120, // TODO: Try not to use fixed size values for images. It's a bit tricky to use flex, but it can (and should) be done.
    height: 120
  },

  button: {
    marginTop: 5
  },
  title: {
    color: '#00485e',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  message: {
    color: '#00485e',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
