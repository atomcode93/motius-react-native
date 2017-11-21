import React from 'react';
import { Navigator, View, ListView, RefreshControl, StyleSheet } from 'react-native';
import TimeView from '../../../components/TimeView';
import ProjectCard from './ProjectCard';
import { connect } from 'react-redux';
import {fetchProjects} from '../../../../logic/project/actions';
import { Card, CardSection} from '../../../components';

class WorkingProjects extends React.Component {

  state = {
    refreshing: false
  };

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 /* TODO: This will limit to comparison by instance reference. Maybe you can do some comparison of the values in the object instead (would limit the number of renders)*/});

  componentDidMount(){
    this.fetchProjects();
  }

  render() {
    return (
      <View style={styles.workingProjectsViewStyle}>
        {this.renderTimer()}
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchProjects}
            />
          }
          enableEmptySections
          dataSource={this.getDataSource()}
          renderRow={project => <ProjectCard aProject={project} />}
        />
      </View>
    );
  }

  renderTimer = () => {
    if (this.props.timer.started) {
      return (
        <TimeView />
      );
    }
  }

  fetchProjects = () => {
    this.setState({refreshing: true});
    this.props.dispatch(fetchProjects(()=>{this.setState({refreshing: false});}));
  }

  getDataSource = () => {
    const dataSource = this.ds.cloneWithRows(this.props.project.projects);
    return dataSource;
  }

}
const styles = StyleSheet.create({
  workingProjectsViewStyle: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  }
});

function mapStateToProps({ timer, project }) {
  return {timer, project};
}

export default connect(mapStateToProps)(WorkingProjects);
