import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Router from './routes';
import {Provider} from 'react-redux';
import store from './utils/redux/store';
import {StatusBar} from 'react-native';
import RootNavigator from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(0,0,0,0)"
          translucent
        />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
