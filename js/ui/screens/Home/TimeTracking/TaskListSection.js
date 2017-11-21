/* TODO: Is this in use? */
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

export const TaskListSection = (props) => {
  return (
    <View style={styles.titleContainerStyle}>
      <Text style={styles.titleStyle}>
        {props.milestone.name}
      </Text>
    </View>
  );
};

const styles = {
  titleContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#eeeeee',
    height: 48
  },
  titleStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F346C'
  }
};
