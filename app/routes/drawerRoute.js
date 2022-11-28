import React from 'react';
import DrawerContent from '../components/drawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard';
import {AppColor} from '../shared/appColors';
import SocialHomeScreen from '../screens/SocialHomeScreen';
import MainBottomTab from '../components/MainBottomTab';
import drawerStackNavigator from './drawerStackNavigator';
import EventsScreen from '../screens/EventsScreen';
import JobsScreen from '../screens/JobsScreen';
import MatrimonialsScreen from '../screens/MatrimonialsScreen';
import DonationsScreen from '../screens/DonationsScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import {ClassifiedAds} from '../screens/ClassifiedAds';
import Polling from '../screens/Polling';
import ModulesAndMore from '../screens/ModulesAndMore';
const Drawer = createDrawerNavigator();

function DrawerRoute(props) {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        // drawerStyle: {
        //   // alignSelf: 'flex-end',
        //   marginLeft: Dimensions.get('window').width * 0.35,
        //   // borderTopLeftRadius: 50,
        //   // borderTopRightRadius: 50,
        //   borderRadius: 30,
        // },
        // drawerPosition: 'right',
        headerStyle: {
          // backgroundColor: 'transparent',
          backgroundColor: AppColor.white,
        },
        // headerShown: false,
        headerTintColor: AppColor.darkGray,
        headerTitleStyle: {
          //fontWeight: "bold",
        },
      }}>
      <Drawer.Group>
        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Home',
          }}
          name={'home'}
          component={Dashboard}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Social',
          }}
          name={'socialHome'}
          component={MainBottomTab}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Events',
          }}
          name={'events'}
          component={EventsScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Adverts',
          }}
          name={'ClassifiedAds'}
          component={ClassifiedAds}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Jobs',
          }}
          name={'jobs'}
          component={JobsScreen}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Donations',
          }}
          name={'donations'}
          component={DonationsScreen}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Polling',
          }}
          name={'polling'}
          component={Polling}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Matrimonials',
          }}
          name={'matrimonials'}
          component={MatrimonialsScreen}
        />

        <Drawer.Screen
          options={{
            headerShown: true,
            title: 'Volunteer',
          }}
          name={'volunteer'}
          component={VolunteerScreen}
        />

        <Drawer.Screen
          options={{
            headerShown: false,
            title: '',
          }}
          name={'moduleAndMore'}
          component={ModulesAndMore}
        />
      </Drawer.Group>
      {/* <Drawer.Group screenOptions={{presentation: 'modal'}}>
        <Drawer.Screen
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
          name={'filter'}
          component={FilterScreen}
        />
      </Drawer.Group> */}
    </Drawer.Navigator>
  );
}

export default DrawerRoute;
