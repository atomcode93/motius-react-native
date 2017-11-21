import React, {Component} from 'react';
import { FacebookUser } from './FacebookUser'
import { FacebookPost } from './FacebookPost'
import { Card } from '../Card'
import moment from 'moment';
// TODO: This component could be refactored into a stateless component: https://medium.com/front-end-hacking/stateless-components-in-react-native-e9034f2e3701
export class FacebookCard extends Component {

  // TODO: You do not need to define the constructor if you are not doing something in it
  constructor(props) {
    super();
  }

  componentWillMount(){

  }

  render() {
    return this.createFacebookCard(this.props.post)
  }

  createFacebookCard(post) {
    return (
      <Card key={post.id}>
        <FacebookUser user={this.props.user} time={this.formatTime(post.created_time)} />
        <FacebookPost post={this.props.post} />
      </Card>
    );
  }

  // TODO: I have seen this function a few times already. Why not creating a 'utils.js' file that then is imported from every file that needs it?
  formatTime(time) {
    return moment(time).format('hh:mm');
  }

};
