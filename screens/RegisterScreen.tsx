import React, { FC, useState } from "react";
import { Box, Button, Container, Heading, Input } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import useRegister from "../hooks/auth/useRegister";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, register } = useRegister();

  return (
    <Box safeArea flex={1} alignItems="center">
      <Container w="90%" pt={10} centerContent>
        <Heading size="lg" bold bottom={10}>
          アカウント登録
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
        <Button
          w="100%"
          onPress={() => register({ email, password })}
          isLoading={isLoading}
        >
          アカウントを作成する
        </Button>
      </Container>
    </Box>
  );
};

export default RegisterScreen;
