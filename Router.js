import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from './Contexts/AuthProvider'
import  AuthStackNavigator from './Routes/UnAuthenticatedNavigator';
import MainDrawerNavigator from './Routes/AuthenticatedNavigator'

const Router = () => {
    const EzAuth = useContext(AuthContext);
    
    useEffect(() => {
        //reload the page when loggedIn context changes..
    },[EzAuth.loggedIn])

        if (EzAuth.loggedIn === false) {
            return (
                <AuthStackNavigator/> 
            );
        } else{
            return (
                <MainDrawerNavigator/>
            );
        }
}

export default Router
