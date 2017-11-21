import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../../components';
import { selectProject } from '../../../../logic/project/actions';
import {icons} from '../../../assets';

const ProjectListItem = (props) => {
  let isSelected = false;
  if (props.project.selectedProject !== null ) {
    isSelected = props.aProject.id === props.project.selectedProject.id;
  }
  return (
    <TouchableOpacity activeOpacity={ .5 } onPress={ () => props.selectProject(props.aProject) }>
      <CardSection>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.iconStyle}
            source = {isSelected ? icons.check_on : icons.check_off} />
        </View>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.titleStyle}>
            {props.aProject.name}
          </Text>
        </View>
      </CardSection>
    </TouchableOpacity>
  );
};

const styles = {
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    height: 48,
    width: 48
  },
  iconStyle: {
    height: 25,
    width: 25
  },
  titleContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    height: 48
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F346C'
  }
};

function mapStateToProps({ project }) {
  return { project };
}

export default connect(mapStateToProps, {selectProject})(ProjectListItem);
