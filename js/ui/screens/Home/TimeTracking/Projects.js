import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Navigator, ListView, RefreshControl } from 'react-native';
import ProjectListItem from './ProjectListItem';
import { fetchProjects } from '../../../../logic/project/actions';
import { resetTask } from '../../../../logic/milestone/actions';

class Projects extends React.Component {

  state = {
    refreshing: false
  };

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  componentDidMount() {
    this.fetchProjects();
  }

  componentWillUnmount() {
    this.props.resetTask();
  }

  render() {
    return (
      <View style={styles.viewContainerStyle}>
        <ListView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchProjects /*TODO: This prop is not in use*/} />
          }
          enableEmptySections
          dataSource={this.ds.cloneWithRows(this.props.project.projects)}
          renderRow={(project) => <ProjectListItem aProject={project} isSelected={true}/>}
        />
      </View>
    );
  }

  fetchProjects = () => {
    this.setState({ refreshing: true });
    this.props.fetchProjects(()=>this.setState({ refreshing: false }));
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

function mapStateToProps({ project }) {
  return { project };
}

export default connect(mapStateToProps, { fetchProjects, resetTask })(Projects);
