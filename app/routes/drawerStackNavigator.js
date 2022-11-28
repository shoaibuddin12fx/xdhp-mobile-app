import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppColor} from '../shared/appColors';
import Login from '../screens/login';
import Home from '../screens/home';
import {navigationRef} from '../helpers/navigationHelper';
import SignIn from '../screens/SignIn';
import SplashScreen from '../screens/SplashScreen';
import LoginSelections from '../screens/LoginSelections';
import Dashboard from '../screens/Dashboard';
import ProductOverView from '../screens/ProductOverView';
import LoginScreen from '../screens/LoginScreen';
import SocialHomeScreen from '../screens/SocialHomeScreen';
import UserPostScreen from '../screens/UserPostScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import InboxScreen from '../screens/InboxScreen';
import ProdustScreen from '../screens/ProdustScreen';
import MyCart from '../screens/MyCart';
import CheckOutScreen from '../screens/CheckOutScreen';
import ShippingAddress from '../screens/ShippingAddress';
import TrackOrder from '../screens/TrackOrder';
import DrawerRoute from './drawerRoute';
import MainBottomTab from '../components/MainBottomTab';
const Stack = createNativeStackNavigator();

function drawerStackNavigator(props) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={'home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: AppColor.white,
        },
        headerTintColor: AppColor.black,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: AppColor.black,
        },
        headerBackTitleStyle: {
          color: AppColor.black,
        },
      }}>
      <Stack.Group>
        {routes.map(route => (
          <Stack.Screen
            options={{headerShown: route.headerShown, title: route.title}}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}

const routes = [
  {
    name: 'home',
    title: 'Home',
    component: Dashboard,
    headerShown: true,
  },
  {
    name: 'socialHome',
    title: 'Social',
    component: MainBottomTab,
    headerShown: true,
  },
];

export default drawerStackNavigator;
