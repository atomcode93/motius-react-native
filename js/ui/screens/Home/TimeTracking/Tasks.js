import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, StyleSheet, Navigator, ListView, RefreshControl } from 'react-native';
import { Spinner } from '../../../components';
import TaskListItem from './TaskListItem';
import TaskListSection from './TaskListSection';
import { fetchMilestones } from '../../../../logic/milestone/actions';
import { resetTask } from '../../../../logic/milestone/actions';
import GLOBAL from '../../../../common/Globals.js';

class Tasks extends React.Component {

  state = {
    refreshing: false
  };


  getSectionData = (dataBlob, sectionID) => {
    return dataBlob[sectionID];
  }
  getRowData = (dataBlob, sectionID, rowID) => {
    return dataBlob[sectionID + ':' + rowID];
  }

  ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });


  componentDidMount() {
    if (this.props.project.selectedProject === null) {
      this.props.resetTask();
    }
    this.fetchMilestones();
  }

  render() {
    return (
      <View style={styles.viewContainerStyle}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchMilestones}
            />
          }
          enableEmptySections
          dataSource={this.ds.cloneWithRows(this.getTasks())}
          renderRow={(task) => <TaskListItem aTask={task} isSelected={true}/>}
          />
      </View>
    );
  }

  fetchMilestones =() => {
    this.setState({refreshing: true});
    this.props.fetchMilestones(this.props.project.selectedProject.id, ()=>{this.setState({refreshing: false});});
  }

  getTasks() {
    let tasks = [];
    this.props.milestone.milestones
      .forEach(milestone => milestone.tasks
        .forEach(task => tasks.push(task)
      ));
    return tasks;
  }


}

const styles = StyleSheet.create({
  viewContainerStyle: {
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 48,
    width: 48
  },
  iconStyle: {
    height: 25,
    width: 25
  },
  titleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 48
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F346C'
  }
});

function mapStateToProps({ project, milestone }) {
  return { project, milestone };
}

export default connect(mapStateToProps, { fetchMilestones, resetTask })(Tasks);
