import React, {Component} from 'react';
import { View } from 'react-native';
import { InstagramUser } from './InstagramUser'
import { Card } from '../Card'
import { CardSection } from '../CardSection';
import FileCard from './FileCard';
import moment from 'moment';
// TODO: This component could be refactored into a stateless component: https://medium.com/front-end-hacking/stateless-components-in-react-native-e9034f2e3701
export class InstagramCard extends Component {

  // TODO: You do not need to define the constructor if you are not doing something in it
  constructor(props) {
    super();
  }

  componentWillMount(){
    
  }

  render() {
    return this.createInstagramCard(this.props.media)
  }

  createInstagramCard(media) {
    return (
      <Card key={media.id}>
        <InstagramUser user={this.props.user} time={this.formatTime(media.created_time)} />
        <CardSection>
            <View style= {{flex: 1, flexDirection: 'column'}}>
                <FileCard file={this.props.media} />
            </View>
        </CardSection>
      </Card>
    );
  }

  // TODO: I have seen this function a few times already. Why not creating a 'utils.js' file that then is imported from every file that needs it?
  formatTime(time) {
    return moment.unix(time).format('hh:mm');
  }

};
