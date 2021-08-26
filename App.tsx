import React from "react";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from './screens/DetailScreen';
import firebase from "./utils/firebase";
import AuthScreen from './screens/AuthScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [user, setUser] = useState<null | undefined | firebase.User>(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser)
  }, []);
  
  return (
    <NativeBaseProvider>
      {user ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Todo" }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "詳細" }} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <AuthScreen />
      )}
    </NativeBaseProvider>
  );
}

export default App;
