import { createStackNavigator } from 'react-navigation-stack';
import { createAppController } from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

const screens = {
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);