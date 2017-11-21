import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
export class DrawerComponent extends React.Component {

  props: {
    text: String,
    icon: ReactComponent<any>;
    onPress?: () => void;
  }

  render() {
    return (
      <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            {this.props.icon}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}> {this.props.text} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
  textContainer: {
    flex: 4,
    marginHorizontal: 2,
  },
  text: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  }
});
