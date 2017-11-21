import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation, WebView } from 'react-native';
import Video from 'react-native-video';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import * as selectedCardActions from '../../../logic/selectedCard/actions'
import { connect } from 'react-redux';
import axios from 'axios';

var GLOBAL = require('../../../common/Globals.js');

class FileCard extends Component {

  // TODO: There is a typo here. You have to use state = {...}, not state: {}. You are defining a type, not the property value if you do it like this.
//   state: {
//     collapsed: false
//   }

  constructor(props) {
    super(props);
    // TODO: If you receive a different prop value afterwards, the this.file value will not be updated. Never copy props values unless you are going to modify them afterwards (and if you do that, then you have to track the changes using componentWillReceiveProps)
    this.file = this.props.file;
    this.numberOfTouches = 0
    this.state = {
      videoURL: ''
    }
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  componentWillMount() {
    if (this.file.type === 'video_inline'){
      this.fetchURL();
    }
  }

  render() {
    var logo = this.getFileTypeLogo(this.file.type);

    let icon = require('../../assets/down-arrow.png')
    if(this.props.expanded){
      icon = require('../../assets/up-arrow.png')
    }
    return (
      <Card>
        <TouchableOpacity
          activeOpacity={ 1 }
          onPress={ () => this.selectCard(this.file.url) }
        >
          <CardSection>
            <Image
              style = {styles.logoStyle}
              source = {logo}
            />
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
    return this.props.selectCard('')
  }

  renderFileCard() {
    if (this.props.expanded) {
      return (
        <CardSection>
          {this.renderFileType(this.file.type)}
        </CardSection>
      );
    };
  }

  renderFileType(type) {
    switch (type) {
      case 'video_inline':
        console.log("video = ", this.state.videoURL);
        return ( this.state.videoURL !== ''?
          <Video
            repeat
            resizeMode='cover'
            style={styles.fileContainer}
            source={{
              uri: this.state.videoURL
            }}
          />: null
        );
      case 'photo':
        return (
          <Image
            resizeMode='contain'
            style={styles.fileContainer}
            source={{
              uri: this.file.media.image.src,
              
            }}
          />
        );
      case 'map':
        return (
          <Image
            resizeMode='contain'
            style={styles.fileContainer}
            source={{
              uri: this.file.media.image.src,
              
            }}
          />
        );
      default:
      return;
    }
  }

  getFileTypeLogo(type) {
    switch (type) {
      case 'pdf':
        return require('../../assets/pdf.png');
      case 'video_inline':
        return require('../../assets/video.png');
      case 'photo':
        return require('../../assets/png.png');
      case 'map':
        return require('../../assets/map.png');
      default:
        return require('../../assets/search.png')
    }
  }

  fetchURL() {
    axios.get('https://graph.facebook.com/'+ this.props.postid +'?fields=source&access_token=' + GLOBAL.FACEBOOK_TOKEN)
    .then((response) => {
      this.setState({
        videoURL: response.data.source,
      })
    })
    .catch((error) => {
        console.log("facebook alert", this.props.postid);
      alert('There has been a problem: ' + error.message);
    });
  }

};

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
  const expanded = state.selectedFileID == ownProps.file.url
  return { expanded };
}

export default connect(mapStateToProps, selectedCardActions)(FileCard);
