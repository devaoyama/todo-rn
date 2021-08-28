import React, { FC, useState } from "react";
import { Box, Button, Container, Heading, Input } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import firebase from "../utils/firebase";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickLoginButton = async () => {
    setIsLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box safeArea flex={1} alignItems="center">
      <Container w="90%" pt={10} centerContent>
        <Heading size="lg" bold bottom={10}>
          ログイン
        </Heading>
        <Input
          w="100%"
          mb={5}
          placeholder="メールアドレス"
          placeholderTextColor="blueGray.500"
          backgroundColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          type="password"
          w="100%"
          mb={10}
          placeholder="パスワード"
          placeholderTextColor="blueGray.500"
          backgroundColor="white"
          value={password}
          onChangeText={setPassword}
        />
        <Button w="100%" onPress={onClickLoginButton} isLoading={isLoading}>
          ログイン
        </Button>
      </Container>
    </Box>
  );
};

export default LoginScreen;
