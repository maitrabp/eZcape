import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home';
import EmailVerification from '../Screens/EmailVerification';
import MainScreen from "../Screens/MainScreen";

const screens = {
    "Home": {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        }
    },
    "Login": {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    "Sign Up": {
        screen: SignUp
    },
    
    "Password Reset": {
        screen: PasswordReset
    },
    "Email Verification": {
        screen: EmailVerification,
        navigationOptions: {
            headerShown: false,
        }
    },
    "MainScreen": {
        screen: MainScreen,
        navigationOptions: {
            headerShown:false,
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);