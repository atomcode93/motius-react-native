import React, {Component} from 'react';
import { SlackUser } from '../Slack/SlackUser';
import { SlackMessage } from '../Slack/SlackMessage';
import { Card } from '../Card';
import moment from 'moment';

export class SlackCard extends Component {

  render() {
    const message = this.props.message;
    return (
      <Card key={message.ts}>
        <SlackUser userID={message.user} time={this.fromUnixToTime(message.ts)} />
        <SlackMessage message={message} />
      </Card>
    );
  }

  fromUnixToTime(unixTs) {
    return moment.unix(unixTs).format('hh:mm');
  }

}
