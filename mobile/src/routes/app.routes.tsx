import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
const App = createStackNavigator();


const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      headerShown: false,
      cardStyle: { backgroundColor:'#312e38'},
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
