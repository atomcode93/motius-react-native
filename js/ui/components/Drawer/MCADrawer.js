import React from 'react';
import { Alert, Image, View, ScrollView, StyleSheet, Text, Linking, Platform, AsyncStorage } from 'react-native';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import {DrawerComponent} from './DrawerComponent';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { Header } from '../';


export default class MCADrawer extends React.Component {
  constructor() {
    super();
  }
  render() {
    const iconSize = 20;

    const state = this.props.navigationState;
    const children = state.children;

    const SideMenu = (props) => (
      <View style={styles.container}>
        <DrawerComponent
          onPress={()=>{ this._onNewsFeedPress(props); }}
          text='News Feed'
          icon={<FaIcon name={'newspaper-o'} size={iconSize} color={'#0f346c'} />} />
        <DrawerComponent
          onPress={()=>{ this._onWorkingProjectsPress(props); }}
          text='Working Projects'
          icon={<FaIcon name={'stack-overflow'} size={iconSize} color={'#0f346c'} />} />
        <DrawerComponent
          onPress={()=>{ this._onInvitationsPress(props); }}
          text='Invitations'
          icon={<FaIcon name={'send'} size={iconSize} color={'#0f346c'} />} />
        <DrawerComponent
          onPress={()=>{ this._onSettingsPress(props); }}
          text='Settings'
          icon={<FaIcon name={'gear'} size={iconSize} color={'#0f346c'} />} />
        <DrawerComponent
          onPress={()=>{ this._onLogoutPress(props); }}
          text='Log out'
          icon={<FaIcon name={'level-down'} size={iconSize} color={'#0f346c'} />}
          />
      </View>
    );

    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="displace"
        content={<SideMenu closeDrawer={()=>{
          this.refs.navigation.close();
        }} scene={this.props.scene} />}
        tapToClose={true}
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        negotiatePan={true}
        tweenDuration={100}
        tweenHandler={ratio => ({
          main: { opacity: 1 },
          mainOverlay: { opacity: ratio / 2, backgroundColor: 'black'},
        })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}  />
      </Drawer>

    );
  }

  _onNewsFeedPress(props) {
    props.closeDrawer();
    Actions.newsFeed();

  }

  _onWorkingProjectsPress(props) {
    props.closeDrawer();
    Actions.workingProjects();
  }

  _onInvitationsPress(props) {
    props.closeDrawer();
    Actions.invitations();
  }

  _onSettingsPress(props) {
    props.closeDrawer();
    Actions.settings();
  }

  _onLogoutPress(props) {
    try {
      AsyncStorage.clear();
      Actions.pop();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: '80%',
    paddingBottom: '80%'
  },
  image: {
    width: 40,
    height: 40,
  }
});
