import React from "react";
import { Center, Button, Heading, Container } from "native-base";

const AuthScreen = () => {
  return (
    <Center flex={1}>
      <Container w="90%" centerContent>
        <Heading bottom={10}>Todo App</Heading>
        <Button w="100%" bottom={3}>
          ログイン
        </Button>
        <Button w="100%" variant="outline" colorScheme="light">
          登録
        </Button>
      </Container>
    </Center>
  );
};

export default AuthScreen;
