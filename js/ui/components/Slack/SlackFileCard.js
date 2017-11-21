import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation, WebView } from 'react-native';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import * as selectedCardActions from '../../../logic/selectedCard/actions';
import { connect } from 'react-redux';

var GLOBAL = require('../../../common/Globals.js');

class SlackFileCard extends Component {

  // TODO: There is a typo here. You have to use state = {...}, not state: {}. You are defining a type, not the property value if you do it like this.
  state: {
    collapsed: false
  }

  constructor(props) {
    super(props);
    // TODO: If you receive a different prop value afterwards, the this.file value will not be updated. Never copy props values unless you are going to modify them afterwards (and if you do that, then you have to track the changes using componentWillReceiveProps)
    this.file = this.props.file;
    this.numberOfTouches = 0;
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    var logo = this.getFileTypeLogo(this.file.filetype);
    let icon = require('../../assets/down-arrow.png');
    if(this.props.expanded){
      icon = require('../../assets/up-arrow.png');
    }
    return (
      <Card>
        <TouchableOpacity
          activeOpacity={ 1 }
          onPress={ () => this.selectCard(this.file.id) }
        >
          <CardSection>
            <Image
              style = {styles.logoStyle}
              source = {logo}
            />
            <View style={{justifyContent: 'space-around', flexDirection: 'column', marginLeft: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                {this.file.name}
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500'}}>
                Size {this.fromBytesToMB(this.file.size)} Mb
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
              <Image
                style = {{height: 15, width: 15}}
                source = {icon}
              />
            </View>
          </CardSection>
        </TouchableOpacity>
        {this.renderFileCard()}
      </Card>
    );
  }

  selectCard(id) {
    this.numberOfTouches++;
    if (this.numberOfTouches % 2 == 1){
      return this.props.selectCard(id); // TODO: This function does not return a value, so it is counterintuitive to return its value (will always be undefined)
    }
    return this.props.selectCard('');
  }

  renderFileCard() {
    if (this.props.expanded) {
      return (
        <CardSection>
          {this.renderFileType(this.file.filetype)}
        </CardSection>
      );
    }
  }

  renderFileType(type) {
    switch (type) {
    case 'jpg':
    case 'png':
      console.log('Bearer ' + GLOBAL.SLACK_TOKEN);
      return (
        <Image
          resizeMode='contain'
          style={styles.fileContainer}
          source={{
            uri: this.file.url_private,
            headers: {Authorization: 'Bearer ' + GLOBAL.SLACK_TOKEN}
          }}
          />
      );
    default:
      return (
        <WebView
          style={styles.fileContainer}
          source={{
            uri: this.file.url_private,
            headers: {Authorization: 'Bearer ' + GLOBAL.SLACK_TOKEN}
          }}
        />
      );
    }
  }

  getFileTypeLogo(type) {
    switch (type) {
    case 'pdf':
      return require('../../assets/pdf.png');
    case 'text':
      return require('../../assets/txt.png');
    case 'png':
      return require('../../assets/png.png');
    case 'jpg':
      return require('../../assets/jpg.png');
    default:
      return require('../../assets/search.png');
    }
  }

  fromBytesToMB(number) {
    return (number / 131072).toFixed(2);
  }

}

// TODO: Always use `StyleSheet.create`, it optimizes style loading.
const styles = {
  logoStyle: {
    height: 30,
    width: 30,
    borderRadius: 4
  },

  fileContainer: {
    flex: 1,
    width: '100%',
    height: 400
  },

  textContainer: {
    flex: 1,
    width: '100%',
    height: 100
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedFileID == ownProps.file.id;
  return { expanded };
};

export default connect(mapStateToProps, selectedCardActions)(SlackFileCard);
