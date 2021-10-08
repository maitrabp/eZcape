import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home';
import HomePage from '../Screens/HomePage';
import HomeLandingPage from '../Screens/HomeLandingPage';
import EmailVerification from '../Screens/EmailVerification';
import MainScreen from "../Screens/MainScreen";

const screens = {
    
    "Login": {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    "Sign Up": {
        screen: SignUp
    },
    "HomeLandingPage": {
        screen: HomeLandingPage,
        navigationOptions: {
            headerShown: false,
        }
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
// const HomeStack = createStackNavigator({
//     HomeLandingPage: HomeLandingPage
// });

export default createAppContainer(HomeStack);