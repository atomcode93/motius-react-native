import React from 'react';
import { Navigator, StyleSheet } from 'react-native';
import { Actions, Scene, Stack, Router, Modal } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { startTimerAt, stopTimerAt } from './logic/timer/actions';
import Login  from './ui/screens/Login/Login';
import NewsFeed from './ui/screens/Home/NewsFeed';
import WorkingProjects from './ui/screens/Home/WorkingProjects/WorkingProjects';
import Invitations from './ui/screens/Home/Invitations/Invitations';
import Settings from './ui/screens/Home/Settings';
import TimetrackingView from './ui/screens/Home/TimeTracking/TimetrackingView';
import Drawer from './ui/components/Drawer/MCADrawer';
import TimerIcon from './ui/components/TimerIcon';
import Projects from './ui/screens/Home/TimeTracking/Projects';
import Tasks from './ui/screens/Home/TimeTracking/Tasks';
import ProjectDetails from './ui/screens/Home/WorkingProjects/ProjectDetails';
import ProjectTimeLogs from './ui/screens/Home/WorkingProjects/ProjectTimeLogs';
import {icons} from './ui/assets';

class Routes extends React.Component {

  state = {
    icon: null
  };

  render() {
    const icon = this.props.started ? icons.stop_timer : icons.start_timer;
    const isLoggedIn = this.props.motiusUserToken !== null;
    return (
      <Router>
        <Scene key="login" component={ Login } title="Login" initial={!isLoggedIn} />
        <Scene key="home" component={ Drawer } open={false} hideTabBar initial={isLoggedIn}>
          <Scene key="scenes" tabs={true}>
            {this.createHomeScene('newsFeed', NewsFeed, 'News Feed', icon)}
            {this.createHomeScene('workingProjects', WorkingProjects, 'Working Projects', icon)}
            {this.createHomeScene('invitations', Invitations, 'Invitations', icon)}
            {this.createHomeScene('settings', Settings, 'Settings', icon)}
          </Scene>
        </Scene>
        <Scene key="modal" direction="vertical" component={Modal} panHandlers={null} >
          <Scene key="root">
            <Scene
              key="timeTracking"
              component={ TimetrackingView }
              title="Time Tracking"
              sceneStyle={styles.sceneStyle}
              onLeft={() => this._onCloseButtonPress()}
              leftButtonImage={icons.clear}
              leftButtonIconStyle={styles.iconStyle}
              startTime={this.props.startedTime}
              endTime={this.props.finishedTime}
            />
            {this.createScene('projects', Projects, 'Projects')}
            {this.createScene('tasks', Tasks, 'Tasks')}
          </Scene>
        </Scene>
          {this.createScene('projectDetails', ProjectDetails, 'Project Details')}
          {this.createScene('projectTimeLogs', ProjectTimeLogs, 'Time Logs')}
      </Router>
    );
  }

  createHomeScene(key, component, title, icon) {
    return (
      <Scene
        key={key}
        component={ component }
        title={title}
        onLeft={() => Actions.refresh({key: 'home', open: value => !value })}
        leftButtonImage= {icons.menu}
        leftButtonIconStyle={styles.iconStyle}
        renderRightButton={() => <TimerIcon />}
        rightButtonImage= {icon}
        rightButtonIconStyle={styles.iconStyle}
      />
    );
  }

  createScene(key, component, title) {
    return (
      <Scene
        key={key}
        component={component}
        panHandlers={null}
        title={title}
        backButtonImage = {icons.back}
      />
    );
  }

  _onCloseButtonPress() {
    Actions.pop();
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20
  },
  sceneStyle: {
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  }
});


const mapStateToProps = ({ auth, timer }) => {
  const { started, startedTime, finishedTime } = timer;
  const { motiusUserToken } = auth;
  return {started, startedTime, finishedTime, motiusUserToken };
};

export default connect(mapStateToProps, { startTimerAt, stopTimerAt })(Routes);
