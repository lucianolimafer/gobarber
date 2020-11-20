import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Auth = createStackNavigator();

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';




const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      headerShown: false,
      cardStyle: { backgroundColor:'#312e38'},
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
