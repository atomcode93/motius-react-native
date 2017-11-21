import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import axios from 'axios';

export class SlackUser extends Component {

  state = {
    user: new Object(),
    profile: new Object()
  };

  componentDidMount() {
    this.fetchData();
  }

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
            source = {require('../../assets/slack_logo.png')}
        />
        </CardSection>
        <CardSection>
          <View style={imageContainerStyle}>
            <Image
              style={profilePicStyle}
              source={{ uri: this.getProfilePic() }} />
          </View>
          <View style={headerContentStyle}>
            <View style= {{justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={realNameStyle}>
                {this.getRealName()}
              </Text>
              <View style={timestampContent}>
                <Text style={timestampStyle}>
                  {this.props.time}
                </Text>
              </View>
            </View>
            <Text style={emailStyle}>
              {this.getEmail()}
            </Text>
          </View>
        </CardSection>
      </View>
    );
  }

  getRealName() {
    return (
        this.state.user.real_name
    );
  }

  getEmail() {
    return (
        this.state.profile.email
    );
  }

  getProfilePic() {
    return (
        this.state.profile.image_72
    );
  }

  fetchData() {
    axios.get(`https://slack.com/api/users.info?token=xoxp-179940535380-179891467378-248996050244-98586c5720566924c174934ee1cee38f&user=${this.props.userID}&pretty=1`)
    .then((response) => {
      this.setState({
        user: response.data.user,
        profile: response.data.user.profile
      });
    })
    .catch((error) => {
      console.log("slack alert");
      alert('There has been a problem: ' + error.message);
    });
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

};
