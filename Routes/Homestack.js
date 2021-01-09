import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home';
import EmailVerification from '../Screens/EmailVerification';

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
    "Home": {
        screen: Home,
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
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);