import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SocialHomeScreen from '../screens/SocialHomeScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColor} from '../shared/appColors';
import {IconButton} from 'react-native-paper';
import FriendsScreen from '../screens/FriendsScreen';
import PhotosView from '../screens/PhotosView';
import SocialWatchScreen from '../screens/SocialWatchScreen';
import SocialGroups from '../screens/SocialGroups';

const Tab = createBottomTabNavigator();

function MainBottomTab({navigation, route}) {
  //   const isDarkMode = useColorScheme() === 'dark';
  //   const {colors} = useTheme();

  //   const footer = {
  //     footerColor: isDarkMode ? '#FFFFFF' : '#2B2D45',
  //   };

  const tabNavigationData = [
    {
      name: 'socialHome',
      component: SocialHomeScreen,
      icon: 'md-home',
      icon2: 'md-home-outline',
      headerShown: true,
    },
    {
      name: 'as',
      component: FriendsScreen,
      icon: 'person',
      icon2: 'person-outline',
      headerShown: true,
    },
    {
      name: 'sd',
      component: SocialGroups,
      icon: 'people',
      icon2: 'people-outline',
      headerShown: false,
    },
    {
      name: 'df',
      component: PhotosView,
      icon: 'image',
      icon2: 'image-outline',
      headerShown: true,
    },
    {
      name: 'ghgh',
      component: SocialWatchScreen,
      icon: 'tv',
      icon2: 'tv-outline',
      headerShown: true,
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName="socialHome"
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        style: {height: 60},
        activeBackgroundColor: AppColor.white,
        inactiveBackgroundColor: AppColor.white,
      }}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          //   key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? item.icon : item.icon2}
                color={focused ? AppColor.greenButton : AppColor.lightGray}
                size={25}
                // onPress={() => {}}
              />
            ),
            tabBarLabel: ({focused}) => <View></View>,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 5,
  },
  tabBarIcon: {
    opacity: 0.8,
    color: 'reb',
  },
  tabBarIconFocused: {
    opacity: 1,
  },
  footerStyle: {
    height: 60,
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  footerText: {
    // color: Colors.lightGray,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default MainBottomTab;
