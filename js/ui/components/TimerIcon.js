import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert ,Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions, Modal } from 'react-native-router-flux';
import { startTimerAt, pauseTimer, unPauseTimer, stopTimerAt } from '../../logic/timer/actions';

class TimerIcon extends React.Component {
  render() {
    return(
      <View style={styles.iconViewContainer}>
        <TouchableOpacity onPress={this._onButtonPress.bind(this)}>
          {this.renderIcon()}
        </TouchableOpacity>
      </View>
    );
  }

  renderIcon() {
    return(
      <Image
        style = {styles.iconStyle}
        source = { this.props.started ? require('../assets/end_timer.png') : require('../assets/start_timer.png') }
    />
    );
  }
  _onButtonPress() {
    if (this.props.started) {
      Alert.alert(
        'Motius Community App',
        'Stop the timer?',
        [
          {text: 'Yes', onPress: () => this.endTimer()},
          {text: 'No', onPress: () => this.cancel}
        ],
        { cancelable: true }
      );
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.props.startTimerAt(new Date());
  }

  endTimer() {
    this.props.stopTimerAt(new Date());
    Actions.modal({
      startTime: this.props.startedTime,
      endTime: this.props.finishedTime
    });
  }
}

const styles = StyleSheet.create({
  iconViewContainer: {
    right: 10,
    top: 23,
    position: 'absolute'
  },

  iconStyle: {
    width: 26,
    height: 26
  },
});

function mapStateToProps({ timer }) {
  const { started } = timer;
  return timer;
}

export default connect(mapStateToProps, {startTimerAt, stopTimerAt})(TimerIcon);
