import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const Button = ({ onPress, children, disabled }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#0F346C',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  }
};
