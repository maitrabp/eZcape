import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home';

const screens = {
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    PasswordReset: {
        screen: PasswordReset
    },
    Home: {
        screen: Home
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);