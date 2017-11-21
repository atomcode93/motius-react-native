import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../../components';
import { selectTask } from '../../../../logic/milestone/actions';
import {icons} from '../../../assets/index';

const TaskListItem = (props) => {
  var isSelected = false;
  if (props.milestone.selectedTask != null ) {
    isSelected = props.aTask.id == props.milestone.selectedTask.id;
  }
  return (
    <TouchableOpacity activeOpacity={ .5 } onPress={ () => props.selectTask(props.aTask) }>
      <CardSection>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.iconStyle}
            source = {isSelected ? icons.check_on : icons.check_off} />
        </View>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.titleStyle}>
            {props.aTask.name}
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
    paddingLeft: 5,
    paddingRight: 5,
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

function mapStateToProps({ milestone }) {
  return { milestone };
}

export default connect(mapStateToProps, { selectTask })(TaskListItem);
