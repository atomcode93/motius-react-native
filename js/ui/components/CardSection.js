import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const CardSection = (props) => {

  const { sectionStyle } = styles;
  return (
    <View style={sectionStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  sectionStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};
