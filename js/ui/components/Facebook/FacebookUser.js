import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from '../Card'
import { CardSection } from '../CardSection'
import axios from 'axios';

export class FacebookUser extends Component {

  // TODO: Object will not create an instance of object like this. Use either 'new Object()' or '{}'
  state = {
    user: Object,
    profile: Object
  };

  render() {
    const { logoStyle,
            headerContentStyle,
            imageContainerStyle,
            timestampContent,
            profilePicStyle,
            realNameStyle,
            emailStyle,
            timestampStyle
          } = styles;

    return (
      <View>
        <CardSection>
        <Image
          style = {logoStyle}
          source = {require('../../assets/fb_logo.png')}
        />
        </CardSection>
        <CardSection>
          <View style={imageContainerStyle}>
            <Image
              style={profilePicStyle}
              source={{ uri: this.props.user.picture.data.url }} />
          </View>
          <View style={headerContentStyle}>
            <View style= {{justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={realNameStyle}>
                {this.props.user.name}
              </Text>
              <View style={timestampContent}>
                <Text style={timestampStyle}>
                  {this.props.time}
                </Text>
              </View>
            </View>
            <Text style={emailStyle}>
              {this.props.user.email}
            </Text>
          </View>
        </CardSection>
      </View>
    );
  }

}

const styles = {
  logoStyle: {
    width: 50,
    height: 14
  },

  headerContentStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column'
  },

  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },

  profilePicStyle: {
    height: 50,
    width: 50,
    borderRadius: 4
  },

  realNameStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  emailStyle: {
    fontSize: 13
  },

  timestampContent: {
    height: 15,
    width: 40,
    backgroundColor: '#f0f0f0',
  },

  timestampStyle: {
    fontSize: 13,
    color: '#a8a8a8',
    fontWeight: 'bold',
    textAlign: 'center'
  }

}
