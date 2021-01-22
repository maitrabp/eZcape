//APP.js replacement
import React from "react";
import { createAppContainer } from "react-navigation";

import {createDrawerNavigator} from "react-navigation-drawer"
import {Dimensions} from 'react-native'

import {Feather} from '@expo/vector-icons'

import {ProfileScreen, HomeScreen, TripScreen, SignOut} from "../Screens";
import EzSideBar from "../Components/EzSideBar"

const DrawerNavigator = createDrawerNavigator({
    ProfileScreen,
    HomeScreen,
    TripScreen,
    SignOut
}, {
    contentComponent: props => <EzSideBar {...props}/>
})


export default createAppContainer(DrawerNavigator);
