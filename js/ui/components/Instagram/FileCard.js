import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation, WebView } from 'react-native';
import Video from 'react-native-video';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import * as selectedCardActions from '../../../logic/selectedCard/actions'
import { connect } from 'react-redux';

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
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
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
          onPress={ () => this.selectCard(this.file.id) }
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
      case 'video':
        return (
          <Video
            repeat
            resizeMode='cover'
            style={styles.fileContainer}
            source={{
              uri: this.file.videos.low_bandwidth.url
            }}
          />
        );
      case 'image':
      
        return (
          <Image
            resizeMode='contain'
            style={styles.fileContainer}
            source={{
              uri: this.file.images.low_resolution.url,
              
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
      case 'text':
        return require('../../assets/txt.png');
      case 'image':
        return require('../../assets/png.png');
      case 'video':
        return require('../../assets/video.png');
      default:
        return require('../../assets/search.png')
    }
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
  const expanded = state.selectedFileID == ownProps.file.id
  return { expanded };
}

export default connect(mapStateToProps, selectedCardActions)(FileCard);
