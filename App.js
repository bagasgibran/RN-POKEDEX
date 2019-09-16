import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import HomeScreen from './navigation/Home';
import ProfileScreen from './navigation/Profile';
import AbilitiesScreen from './navigation/Abilities';
import FilterScreen from './navigation/FilterPokemon';
import ResultScreen from './navigation/ResultFilter';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Abilities: {screen: AbilitiesScreen}
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#fecf33',
    },
  },
  navigationOptions: {
    tabBarLabel: 'HOME',
  },
});
 
const FilterNavigator = createStackNavigator({
  Filter: {screen: FilterScreen},
  Result: {screen: ResultScreen},
  Profile: {screen: ProfileScreen},
  Abilities: {screen: AbilitiesScreen}
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#fecf33',
    },
  },
  navigationOptions: {
    tabBarLabel: 'FILTER',
  },
});

const tabs = createMaterialBottomTabNavigator({
  MainNavigator,FilterNavigator
},{
  initialRouteName: 'MainNavigator',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  fontSize: 100,
  barStyle: { backgroundColor: '#fecf33' },
  animationEnabled: true,
});
const App = createAppContainer(tabs);

export default App; 