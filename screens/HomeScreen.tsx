import React, { FC } from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  VStack,
  HStack,
  Icon,
  Center,
  Button,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import useLogout from "../hooks/auth/useLogout";
import useAddTodo from "../hooks/useTodo";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: FC<Props> = ({ navigation }) => {
  const [inputValue, setInputValue] = React.useState("");
  const { todos, add, remove, updateStatus } = useAddTodo();
  const { logout } = useLogout();
  const addItem = (title: string) => {
    add({ title });
  };
  return (
    <>
      <Center flex={1} top={5}>
        <VStack space={4} flex={1} w="90%">
          <Input
            variant="filled"
            InputRightElement={
              <IconButton
                icon={<Icon as={FontAwesome5} name="plus" size={4} />}
                colorScheme="pink"
                ml={1}
                onPress={() => {
                  addItem(inputValue);
                  setInputValue("");
                }}
                mr={1}
              />
            }
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add Item"
          />
          <VStack>
            {todos.map((todo) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={todo.id}
              >
                <Checkbox
                  colorScheme="pink"
                  isChecked={todo.isCompleted}
                  onChange={() => updateStatus(todo.id, !todo.isCompleted)}
                  value={todo.title}
                  accessibilityLabel="Todoが完了したかのチェックボックス"
                >
                  <Text mx={2} strikeThrough={todo.isCompleted}>
                    {todo.title}
                  </Text>
                </Checkbox>
                <IconButton
                  colorScheme="pink"
                  icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                  onPress={() => remove(todo.id)}
                />
              </HStack>
            ))}
          </VStack>
          <Button onPress={() => navigation.navigate("Detail")}>詳細へ</Button>
          <Button onPress={logout}>ログアウト</Button>
        </VStack>
      </Center>
    </>
  );
};

export default Home;
