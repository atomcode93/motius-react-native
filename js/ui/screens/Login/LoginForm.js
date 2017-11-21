import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Spinner, Input, Card, CardSection, Button } from '../../components';

class LoginForm extends Component {


  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Username"
            placeholder="Motius Username"
            returnKeyType="next"
            value={this.props.username}
            onChangeText={this.props.usernameChanged}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Motius Password"
            returnKeyType="go"
            value={this.props.password}
            onChangeText={this.props.passwordChanged}
          />
        </CardSection>
        <Text style={styles.errorText}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.props.onButtonPress}>
        Login
      </Button>
    );
  }

}

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#c80032',
    fontWeight: 'bold'
  }
});

export default (LoginForm);
