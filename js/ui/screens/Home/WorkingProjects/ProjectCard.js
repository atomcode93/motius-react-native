import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from '../../../components';
import {icons} from '../../../assets';
import striptags from 'striptags';

const ProjectCard = (props) => {

  const onProjectPress = (props) => {
    Actions.projectDetails({
      title: props.aProject.name,
      aProject: props.aProject
    });
  };

  return (
    <TouchableOpacity activeOpacity={ .5 } onPress={ () => onProjectPress(props) }>
      <Card>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.projectImageStyle}
            source={props.aProject.image ? { uri: props.aProject.image } : icons.default_project}
          />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.titleStyle}>
            {props.aProject.name}
          </Text>
        </View>
        <View style={styles.textContainerStyle}>
          <Text>
            {striptags(props.aProject.description)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectImageStyle: {
    height: 250,
    width: '100%',
    borderRadius: 4
  },
  textContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500'
  }
};

export default (ProjectCard);
