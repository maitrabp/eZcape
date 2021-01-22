import React from "react"
import Screen from './Screen'

export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} name="Profile"/>
export const HomeScreen = ({navigation}) => <Screen navigation={navigation} name="Home"/>
export const TripScreen = ({navigation}) => <Screen navigation={navigation} name="Trips"/>
export const SignOut = ({navigation}) => <Screen navigation={navigation} name="SignOut"/>