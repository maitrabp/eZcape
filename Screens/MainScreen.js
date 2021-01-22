//APP.js replacement
import React from "react";
import { createAppContainer } from "react-navigation";

import {createDrawerNavigator} from "react-navigation-drawer"
import {Dimensions} from 'react-native'

import {Feather} from '@expo/vector-icons'

import {ProfileScreen, HomeScreen, TripScreen, SignOut} from "../Screens";
import EzSideBar from "../Components/EzSideBar"

const DrawerNavigator = createDrawerNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            title: "Profile",
            drawerIcon: ({tintColor}) => <Feather name = "user" size={16} color={tintColor}/>
        }
    },
    HomeScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            title: "Home",
            drawerIcon: ({tintColor}) => <Feather name = "home" size={16} color={tintColor}/>
        }
    },
    TripScreen: {
        screen: TripScreen,
        navigationOptions: {
            title: "Trips",
            drawerIcon: ({tintColor}) => <Feather name = "map-pin" size={16} color={tintColor}/>
        }
    },
    SignOut: {
        screen: SignOut,
        navigationOptions: {
            title: "Sign Out",
            drawerIcon: ({tintColor}) => <Feather name = "log-out" size={16} color={tintColor}/>
        }
    }
}, 
{
    contentComponent: props => <EzSideBar {...props}/>,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: true,

    contentOptions: {
        activeBackgroundColor: "#FFBF00",
        activeTintColor: "white",
        itemsContainerStyle: {
            marginTop: 16,
            marginHorizontal: 8
        },
        itemStyle: {
            borderRadius: 4
        }
    }
}
)


export default createAppContainer(DrawerNavigator);
