import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Navigator, Text, View, ListView, LayoutAnimation, RefreshControl, StyleSheet } from 'react-native';
import TimeView from '../../components/TimeView';
import { TimetrackingView } from './TimeTracking/TimetrackingView';
import { SlackCard } from '../../components/Slack/SlackCard';
import { FacebookCard } from '../../components/Facebook/FacebookCard';
import { InstagramCard } from '../../components/Instagram/InstagramCard';
import { Spinner } from '../../components/Spinner';
import * as messageActions from '../../../logic/message/actions';
import * as memberActions from '../../../logic/member/actions';
import * as FBAction from '../../../logic/facebook/actions';
import * as InstagramAction from '../../../logic/instagram/actions';
import GLOBAL from '../../../common/Globals.js';
import { Actions } from 'react-native-router-flux';

class NewsFeed extends React.Component {

  state = {
    messages: [],
    members: [],
    facebook: [],
    instagram: [],
    dates: [],
    loading: false,
    refreshing: false
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  componentDidMount() {
    let { dispatch } = this.props;
    // Get User info of Facebook and Instagram
    dispatch(FBAction.getFBUserInfo(GLOBAL.FACEBOOK_USER));
    dispatch(InstagramAction.getINSUserInfo(GLOBAL.INSTAGRAM_USER));
    this.fetchData()
  }

  render() {
    return (
      <View style={styles.newsFeedViewStyle}>
        {this.renderTimer()}
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)} />}
          enableEmptySections
          dataSource={this.getDataSource()}
          renderRow={(item) => {
          switch(item.type){
            case 'slack':
              return <SlackCard message={item.data} />
            case 'facebook':
              return <FacebookCard user={this.props.facebook.user} post={item.data} />
            case 'instagram':
              return <InstagramCard user={this.props.instagram.user} media={item.data} />
            default:
              return ;
          }
          }
        }
                />
      </View>
    );
  }
  renderTimer() {
    if (this.props.timer.started) {
      return (
        <TimeView />
      );
    }
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
  }

  getDataSource() {
    var dataSource = this.ds.cloneWithRows(this.getMessages());
    return dataSource;
  }

  getMessages() {
    //Fixes to show Facebook and Instagram
    var membersIDArray = [];
    this.props.members.forEach(member => membersIDArray.push(member.id));
    var temp = this.props.messages.filter(message =>
      membersIDArray.includes(message.user)
    );
    var feeds = []; // This contains all feeds
    if (this.props.facebook.posts.data !== undefined){
      this.props.facebook.posts.data.forEach(item => feeds.push({ type: 'facebook', data: item, time: parseInt(this.fromTimeToUnix(item.created_time)) }));
    }
    if (this.props.instagram.medias !== undefined) {
      this.props.instagram.medias.forEach(item => feeds.push({ type: 'instagram', data: item, time: parseInt(item.created_time) }));
    }
    temp.forEach(item => feeds.push({ type: 'slack', data: item, time: parseInt(item.ts) }));
    feeds.sort(this.compare); // Sort feeds by time
    return feeds;
    /*var membersIDArray = [];
    this.state.members.forEach(member => membersIDArray.push(member.id));
    return this.state.messages.filter(message =>
        membersIDArray.includes(message.user)
      );*/
  }

  // sort function to sort of feed array object.
  compare (a, b){
    if (a.time > b.time){
      return -1;
    }
    if (a.time < b.time){
      return 1;
    }
    return 0;
  }

  getDates() {
      // TODO: You can refactor this as const dates = this.getMessages().map(message => this.fromUnixToDate(message.tx));
    var dates = [];
    this.getMessages().forEach(message => dates.push(this.fromUnixToDate(message.ts)));
    return new Set(dates);
  }

  getTimes() {
      // TODO: You can also use map here
    var times = [];
    this.getMessages().forEach(message => times.push(this.fromUnixToTime(message.ts)));
    return new Set(times);
  }

  fetchData() {
    let { dispatch } = this.props;
    let messageAction = messageActions.fetchMessages(GLOBAL.SLACK_HISTORY_CHANNEL);
    let memberAction = memberActions.fetchMembers(GLOBAL.SLACK_USERS_LIST);
    this.setState({
      refreshing: false
    });
    dispatch(messageAction);
    dispatch(memberAction);
    dispatch(FBAction.fetchFBPosts(GLOBAL.FACEBOOK_POST));
    dispatch(InstagramAction.fetchInsMedias(GLOBAL.INSTAGRAM_MEDIA));
  }

  fromUnixToDate(unixTs) {
    return moment.unix(unixTs).format('MMMM Do YYYY');
  }

  fromUnixToTime(unixTs) {
    return moment.unix(unixTs).format('hh:mm');
  }
  fromTimeToUnix(time) {
    return moment(time).unix();
  }
}

const styles = StyleSheet.create({
  newsFeedViewStyle: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  }
});

function mapStateToProps({ messages, members, timer, facebook, instagram  }) {
  const { started, startedTime, finishedTime } = timer;
  return { messages, members, timer, facebook, instagram };
}

export default connect(mapStateToProps)(NewsFeed);
