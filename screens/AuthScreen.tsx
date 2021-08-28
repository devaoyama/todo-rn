import React, { FC } from "react";
import { Center, Button, Heading, Container } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const AuthScreen: FC<Props> = ({ navigation }) => {
  return (
    <Center flex={1}>
      <Container w="90%" centerContent>
        <Heading bottom={10}>Todo App</Heading>
        <Button
          w="100%"
          bottom={3}
          onPress={() => navigation.navigate("Login")}
        >
          ログイン
        </Button>
        <Button w="100%" variant="outline" colorScheme="light" onPress={() => navigation.navigate("Register")}>
          アカウント登録
        </Button>
      </Container>
    </Center>
  );
};

export default AuthScreen;
