import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection} from '../../../components';
import {icons} from '../../../assets';
import striptags from 'striptags';

invitationStateColor = (state) => {
  switch (state) {
    case 'accepted':
      return '#64c359';
    case 'declined':
      return '#ef1c2e';
    case 'interested':
      return'#fda513';
    default:
      return'#ffffff';
  }
}

readableInvitationState = (state) => {
  switch (state) {
    case 'accepted':
      return 'You are accepted';
    case 'declined':
      return 'Not interested';
    case 'interested':
      return 'You applied';
    default:
      return 'Ehh...';
  }
}

renderInvitationStateSection = (props) => {
  var color = this.invitationStateColor(props.anInvitation.state)
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 40, backgroundColor: color, borderRadius: 5}}>
      <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: '500'}}>
        {this.readableInvitationState(props.anInvitation.state)}
      </Text>
    </View>
  )
}

const InvitationCard = (props) => {
  return (
    <TouchableOpacity activeOpacity={ .5 } onPress={ () => console.log("Tap") }>
      <Card>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.invitationImageStyle}
            source={props.anInvitation.project.image ? { uri: props.anInvitation.project.image } : icons.default_project}
          />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.titleStyle}>
            {props.anInvitation.project.name}
          </Text>
        </View>
        <View style={styles.textContainerStyle}>
          <Text>
            {striptags(props.anInvitation.project.description)}
          </Text>
        </View>
        {this.renderInvitationStateSection(props)}
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  invitationImageStyle: {
    height: 250,
    width: '100%',
    borderRadius: 4
  },
  textContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500'
  }
};

export default (InvitationCard);
