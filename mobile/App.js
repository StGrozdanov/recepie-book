import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Panel from './components/ApplicationPanel/Panel';
import Users from './components/Users/Users';
import Recipes from './components/Recipes/Recipes';
import Comments from './components/Comments/Comments';
import Settings from './components/Settings/Settings';
import { AuthProvider } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>

            <Stack.Screen name='Home' component={Login} />
            <Stack.Screen name="Dashboard">
              {(props) => <Panel {...props} content={<Dashboard />} />}
            </Stack.Screen>
            <Stack.Screen name="Users">
              {(props) => <Panel {...props} content={<Users />} />}
            </Stack.Screen>
            <Stack.Screen name="Recipes">
              {(props) => <Panel {...props} content={<Recipes />} />}
            </Stack.Screen>
            <Stack.Screen name="Comments">
              {(props) => <Panel {...props} content={<Comments />} />}
            </Stack.Screen>
            <Stack.Screen name="Settings">
              {(props) => <Panel {...props} content={<Settings />} />}
            </Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}