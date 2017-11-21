import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import SlackFileCard from './SlackFileCard';
import emoji from 'node-emoji';

export class SlackMessage extends Component {

  constructor(props) {
    super(props);
    // TODO: As mentioned before, do not copy prop values
    this.message = this.props.message;
    this.file = this.message.file;
  }

  render() {
    return (
      <CardSection>
        <View style= {{flex: 1, flexDirection: 'column'}}>
          <View>
            {this.getTextMessage()}
          </View>
          <View>
            {this.getFile()}
          </View>
        </View>
      </CardSection>
    );
  }

  getTextMessage() {
    return (
      <View>
        <Text>
          {emoji.emojify(this.processText(this.message.text))}
        </Text>
      </View>
    );
  }

  getFile() {
    if (this.file != undefined) {
      return <SlackFileCard file={this.file} />;
    }
  }

  processText(text) {
    return text
    .replace(/\<(.+?)\|([a-z0-9][a-z0-9._-]*)\> /g, '')
    .replace(/\<(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))\|/g, '')
    .replace(/[<>]/g,'');
  }

}
