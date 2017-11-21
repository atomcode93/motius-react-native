import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Header, Spinner, CardSection, Button } from '../../../components/index';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { logTimer } from '../../../../logic/timer/actions';
import { resetProject } from '../../../../logic/project/actions';
import { resetTask } from '../../../../logic/milestone/actions';
import CookieManager from 'react-native-cookies';
import {icons} from '../../../assets/index';

const Section = ({image, title, text}) => (
  <CardSection>
    <View style={styles.imageContainerStyle}>
      <Image
        style={styles.iconStyle}
        source = {image} />
    </View>
    <View style={styles.headerContentStyle}>
      <View style= {{flexDirection: 'row'}}>
        <Text style={styles.titleStyle}>
          {title}
        </Text>
      </View>
      <Text style={styles.textStyle}>
        {text}
      </Text>
    </View>
  </CardSection>
);

class TimetrackingView extends Component {

  state = {
    descriptionText: '',
    pausedMinutes: 0
  }

  componentDidMount() {
    this.resetValues();
    CookieManager.clearAll();
  }

  render() {
    const day = moment(this.props.startTime).format('ddd, DD MMM YYYY');
    const timeInterval = moment(this.props.startTime).format('hh:mm:ss a') + ' - ' + moment(this.props.endTime).format('hh:mm:ss a');
    const projectName = (this.props.project.selectedProject != undefined) ? this.props.project.selectedProject.name : 'Choose the project you worked on';
    const taskName = (this.props.milestone.selectedTask != undefined) ? this.props.milestone.selectedTask.name : 'Choose the task you worked on';
    const isTaskViewDisabled = this.props.project.selectedProject == null;
    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator = {false} style={{backgroundColor: '#eeeeee'}}>
          <Section image={icons.clock} title={day} text={timeInterval} />
          <Section image={icons.sand_clock} title={'Duration'} text={this.getDuration()} />
          {this.createTextFieldSectionWith(icons.pause, 'Paused Minutes')}
          <TouchableOpacity onPress={Actions.projects}>
            <Section image={icons.bar_chart} title={'Project'} text={projectName} />
          </TouchableOpacity>
          <TouchableOpacity disabled={isTaskViewDisabled} onPress={Actions.tasks}>
            <Section image={icons.task_list} title={'Task'} text={taskName} />
          </TouchableOpacity>
          <CardSection>
            <TextInput
              style={{height: 100, width: '100%' /*TODO: flex*/, backgroundColor: '#ffffff'}}
              placeholder="Description"
              multiline={true}
              numberOfLines={5}
              editable={true}
              onChangeText={(text) => this.setState({descriptionText: text})}
              value={this.state.descriptionText}
            />
          </CardSection>
        </KeyboardAwareScrollView>
        <Text style={styles.errorText}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </View>
    );
  }

  createTextFieldSectionWith(image, title) {
    return (
      <CardSection>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.iconStyle}
            source = {image} />
        </View>
        <View style={styles.headerContentStyle}>
          <View style= {{flexDirection: 'row'}}>
            <Text style={styles.titleStyle}>
              {title}
            </Text>
          </View>
          <TextInput
            style={{height: 20, width: '100%', backgroundColor: '#ffffff'}}
            editable={true}
            defaultValue='0'
            value={this.props.value}
            onChangeText={(text) => this.setState({ pausedMinutes: text })}
            />
        </View>
      </CardSection>
    );
  }

  getDuration() {
    const duration = this.props.endTime - this.props.startTime;
    return this.formatTime(duration);
  }

  formatTime(duration) {
    let seconds = parseInt((duration/1000)%60);
    let minutes = parseInt((duration/(1000*60))%60);
    let hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }

  onButtonPress = () => {
    this.props.logTimer(
      this.props.project.selectedProject.id,
      this.props.startTime.toISOString(),
      this.props.endTime.toISOString(),
      this.state.pausedMinutes,
      this.props.milestone.selectedTask.id,
      this.state.descriptionText
    );
  }

  resetValues() {
    this.props.resetProject();
    this.props.resetTask();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    const disabled = this.props.project.selectedProject == null || this.props.milestone.selectedTask == null;
    return (
      <Button disabled={disabled} onPress={this.onButtonPress}>
          Save
        </Button>
    );
  }
}

const styles = StyleSheet.create({
  projectContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  projectNameStyle: {
    textAlign: 'center',
    fontSize: 18
  },
  scrollViewHeight: {
    height: 100
  },
  headerContentStyle: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginRight: 5
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: 50
  },
  iconStyle: {
    height: 35,
    width: 35,
    borderRadius: 4
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F346C'
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '500'
  },
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#c80032',
    fontWeight: 'bold'
  }
});

function mapStateToProps({ project ,milestone, timer }) {
  const { error, loading } = timer;
  return { project, milestone, error, loading };
}

export default connect(mapStateToProps, { logTimer, resetProject, resetTask })(TimetrackingView);
