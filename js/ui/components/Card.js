import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Card = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }

};
