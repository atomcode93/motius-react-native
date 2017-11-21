import React from 'react';
import { Image, ListView, ScrollView, Text, View, TouchableOpacity, Navigator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../../../components';
import ProjectTimeLogs from './ProjectTimeLogs';
import {icons} from '../../../assets';
import striptags from 'striptags';
import moment from 'moment';

const User = (props) => {
  return (
    <View>
      <CardSection>
        <View style={styles.avatarContainerStyle}>
          <Image
            style={styles.avatarStyle}
            source={{ uri: `http:${props.user.avatar}` }} />
        </View>
        <View style={{justifyContent: 'space-around', flexDirection: 'column'}}>
          <View>
            <Text style={styles.nameStyle}>
              {props.user.user.name}
            </Text>
          </View>
          <Text style={styles.emailStyle}>
            {props.user.user.email}
          </Text>
        </View>
      </CardSection>
    </View>
  );
};

class ProjectDetails extends React.Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2/* TODO: This will limit to comparison by instance reference. Maybe you can do some comparison of the values in the object instead (would limit the number of renders)*/});

  render() {
    const {aProject} = this.props;
    const startDate = moment(aProject.start_date).format('ddd, DD MMM YYYY');
    const endDate = moment(aProject.end_date).format('ddd, DD MMM YYYY');
    return (
      <ScrollView style={styles.projectDetailsViewStyle}>
        <View style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
          <View style={styles.imageContainerStyle}>
            <Image
              style={styles.projectImageStyle}
              source={aProject.image ? { uri: aProject.image } : icons.default_project}
            />
          </View>
          <View style={styles.textContainerStyle}>
            <Text style={styles.titleStyle}>
              {aProject.name}
            </Text>
          </View>
          <View style={styles.textContainerStyle}>
            <Text>
              {striptags(aProject.description)}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.textContainerStyle}>
            <Text style={styles.titleStyle}>
              Team
            </Text>
          </View>
          <ListView
            enableEmptySections
            dataSource={this.ds.cloneWithRows(aProject.team)}
            renderRow={(user) => <User user={user} />}
          />
        </View>
        <View>
          <View style={styles.textContainerStyle}>
            <Text style={styles.titleStyle}>
              Timeline
            </Text>
            <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
              <View style={{flex:1}}>
                <Text style={{fontSize: 14, fontWeight: '500'}}>
                  {startDate}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize: 14, fontWeight: '500'}}>
                  {endDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {this.showTimeLogsButton()}
      </ScrollView>
    );
  }

  onButtonPress(props) {
    Actions.projectTimeLogs({
      title: props.aProject.name,
      aProject: props.aProject
    });
  };

  showTimeLogsButton() {
    if (this.props.aProject.timelog) {
      return (
        <Button onPress={() => this.onButtonPress(this.props)}>
          Time Logs
        </Button>
      )
    }
  }
}

const styles = {
  projectDetailsViewStyle: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectImageStyle: {
    height: 250,
    width: '100%'
  },
  textContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500'
  },
  avatarContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 4
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  emailStyle: {
    fontSize: 13
  }
};

function mapStateToProps({ project, timer }) {
  const {timeLogs} = timer
  return { project, timeLogs };
}

export default connect(mapStateToProps)(ProjectDetails);
