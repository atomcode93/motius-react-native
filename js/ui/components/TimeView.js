import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';
import moment from 'moment';

class TimeView extends Component {

  state = {
    duration: null
  }

  componentDidMount() {
    this._updateDuration();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.setState({
      duration: null
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          {this.formatTime(this.state.duration)}
        </Text>
      </View>
    );
  }

  _updateDuration() {
    if (this.props.started) {
      this.interval = setInterval(() => {
        this.setState({
          duration: new Date() - this.props.startedTime,
          startedTime: new Date()
        });
      }, 1000);
    }
  }

  formatTime(duration) {
    var seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    var hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    backgroundColor: '#64c359',
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0
  },

  textStyle: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 21
  }
});

function mapStateToProps({ timer }) {
  const { started, startedTime, finishedTime } = timer;
  return timer;
}

export default connect(mapStateToProps)(TimeView);
