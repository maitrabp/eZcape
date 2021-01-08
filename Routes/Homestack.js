import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home';
import EmailVerification from '../Screens/EmailVerification';

const screens = {
    "Login": {
        screen: Login
    },
    "Sign Up": {
        screen: SignUp
    },
    "Password Reset": {
        screen: PasswordReset
    },
    "Home": {
        screen: Home
    },
    "Email Verification": {
        screen: EmailVerification
    },
   
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);