import React from "react";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Icon, IconButton } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import firebase from "./utils/firebase";
import AuthScreen from "./screens/AuthScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Loading from "./components/Loading";

export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [user, setUser] = useState<null | undefined | firebase.User>(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <NativeBaseProvider>
      {user === undefined ? (
        <Loading />
      ) : (
        <NavigationContainer>
          {user ? (
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Todo" }}
              />
              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ title: "詳細" }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              initialRouteName="Auth"
              screenOptions={{ presentation: "modal" }}
            >
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ title: "Todo", headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={({ navigation }) => ({
                  title: "",
                  headerStyle: {
                    backgroundColor: "#f2f2f2",
                  },
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <IconButton
                      _pressed={{
                        backgroundColor: "transparent",
                      }}
                      top={1}
                      right={2}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          name="times"
                          size={8}
                          color="muted.500"
                        />
                      }
                      onPress={() => navigation.goBack()}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={({ navigation }) => ({
                  title: "",
                  headerStyle: {
                    backgroundColor: "#f2f2f2",
                  },
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <IconButton
                      _pressed={{
                        backgroundColor: "transparent",
                      }}
                      top={1}
                      right={2}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          name="times"
                          size={8}
                          color="muted.500"
                        />
                      }
                      onPress={() => navigation.goBack()}
                    />
                  ),
                })}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
}

export default App;
