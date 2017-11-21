import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import FileCard from './FileCard';
import axios from 'axios';

var GLOBAL = require('../../../common/Globals.js');

export class FacebookPost extends Component {

  constructor(props) {
    super(props);
    // TODO: As mentioned before, do not copy prop values
    this.post = this.props.post;
    this.state = {
        media: []
    }
  }

  componentWillMount(){
    this.fetchData();
  }

  render() {
    return (
      <CardSection>
        <View style= {{flex: 1, flexDirection: 'column'}}>
          <View>
            {this.post.message !== undefined &&
            <Text>
                {this.post.message}
            </Text>
            }
          </View>
          <View>
            { this.state.media[0] !== undefined &&
                <FileCard file={this.state.media[0]} postid={this.post.id} />
            }
          </View>
        </View>
      </CardSection>
    );
  }

  fetchData() {
    axios.get('https://graph.facebook.com/'+ this.post.id +'/attachments?access_token=' + GLOBAL.FACEBOOK_TOKEN)
    .then((response) => {
      this.setState({
        media: response.data.data,
      })
    })
    .catch((error) => {
        console.log("facebook alert");
      alert('There has been a problem: ' + error.message);
    });
  }

}
