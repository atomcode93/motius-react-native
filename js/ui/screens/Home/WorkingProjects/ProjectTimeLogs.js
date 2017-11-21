import React from 'react';
import { Image, ListView, ScrollView, Text, View, TouchableOpacity, Navigator } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../../components';
import { fetchTimeLogs, resetTimeLogs } from '../../../../logic/timer/actions';
import {icons} from '../../../assets';
import striptags from 'striptags';
import moment from 'moment';

function formatTime(duration) {
  var seconds = parseInt((duration/1000)%60);
  var minutes = parseInt((duration/(1000*60))%60);
  var hours = parseInt((duration/(1000*60*60))%24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

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

const TimeLogItem = (props) => {
  let startTime = moment(props.timelog.start_time).format('dddd, DD MMM YYYY hh:mm:ss a');
  let duration = formatTime(props.timelog.duration_seconds * 1000);
  let task = props.timelog.task.name;
  let comment = props.timelog.comment;
  return (
    <Card>
      <Section image={icons.clock} title={'Start Time'} text={startTime} />
      <Section image={icons.sand_clock} title={'Duration'} text={duration} />
      <Section image={icons.task_list} title={'Task'} text={task} />
      <Section image={icons.comment} title={'Comment'} text={comment} />
    </Card>
  )
}

class ProjectTimeLogs extends React.Component {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentWillMount() {
    this.props.resetTimeLogs()
    this.props.fetchTimeLogs(this.props.aProject.id)
  }

  render() {
    return (
      <View style={styles.projectTimeLogsViewStyle}>
        <Card>
          <Section image={icons.sum} title={'Total Working Time'} text={formatTime(this.calculateWorkingTime() * 1000)} />
        </Card>
        {this.showTimeLogs()}
      </View>
    );
  };

  showTimeLogs() {
    return(
      <ListView
        enableEmptySections
        dataSource={this.ds.cloneWithRows(this.props.timer.timeLogs)}
        renderRow={(timelog) => <TimeLogItem timelog={timelog} />}
      />
    )
  };

  calculateWorkingTime() {
    var durations = []
    this.props.timer.timeLogs.forEach(timeLog => durations.push(timeLog.duration_seconds));
    return durations.reduce((first, second) => first+second, 0)
  };
};

const styles = {
  projectTimeLogsViewStyle: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
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
  }
};

function mapStateToProps({ project, timer }) {
  return { project, timer };
}

export default connect(mapStateToProps, {fetchTimeLogs, resetTimeLogs})(ProjectTimeLogs);
