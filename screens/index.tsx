import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Icon, IconButton } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import useFetchAuth from "../hooks/auth/useFetchAuth";
import Loading from "../components/Loading";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";
import AuthScreen from "./AuthScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  const { loginUser } = useFetchAuth();

  return (
    <>
      {loginUser === undefined ? (
        <Loading />
      ) : (
        <NavigationContainer>
          {loginUser ? (
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
    </>
  );
};

export default Screens;
