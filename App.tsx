import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Home from "./screens/Home";
import Detail from './screens/Detail';

export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: "Todo" }} />
          <Stack.Screen name="Detail" component={Detail} options={{ title: "詳細" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
