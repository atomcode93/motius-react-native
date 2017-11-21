import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import LoginForm  from './LoginForm.js';
import { connect } from 'react-redux';
import { login } from '../../../logic/login/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {icons} from '../../assets';

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    error: '',
  };

  onButtonPress = () => {
    const {username, password} = this.state;
    this.props.dispatch(login({username, password}));
  };

  render() {
    const {height} = Dimensions.get('window');

    return(
      <View style = {styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator = {false}>
          <View style = {[styles.logoContainer, {height: height/2 /*TODO: Use flexbox*/}]}>
            <Image
              style = {styles.logo}
              source = {icons.motius}
            />
            <Text style = {styles.title}>
              Motius
            </Text>
          </View>
          <View>
            <LoginForm
              loading={this.props.loading}
              error={this.props.error}
              username={this.state.username}
              password={this.state.password}
              usernameChanged={username=>this.setState({username})}
              passwordChanged={password=>this.setState({password})}
              onButtonPress={this.onButtonPress}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 120,
    height: 120
  },

  title: {
    color: '#00485e',
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center',
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps)(Login);
