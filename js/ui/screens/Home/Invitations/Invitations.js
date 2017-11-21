import React from 'react';
import { Navigator, View, ListView, RefreshControl, StyleSheet } from 'react-native';
import TimeView from '../../../components/TimeView';
import InvitationCard from './InvitationCard';
import { connect } from 'react-redux';
import {fetchInvitations} from '../../../../logic/project/actions';
import { Card, CardSection} from '../../../components';

class Invitations extends React.Component {

  state = {
    refreshing: false
  };

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  componentDidMount(){
    this.fetchInvitations();
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.invitationsViewStyle}>
        {this.renderTimer()}
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchInvitations}
            />
          }
          enableEmptySections
          dataSource={this.getDataSource()}
          renderRow={invitation => <InvitationCard anInvitation={invitation} />}
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

  fetchInvitations = () => {
    this.setState({refreshing: true});
    this.props.dispatch(fetchInvitations(()=>{this.setState({refreshing: false});}));
  }

  getDataSource = () => {
    const dataSource = this.ds.cloneWithRows(this.props.project.invitations);
    return dataSource;
  }
}

const styles = StyleSheet.create({
  invitationsViewStyle: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  }
});

function mapStateToProps({ timer, project }) {
  return {timer, project};
}

export default connect(mapStateToProps)(Invitations);
