import React from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider
} from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

export default function () {
  const instState = [
    { title: "code", isCompleted: true },
    { title: "sleep", isCompleted: false },
    { title: "repeat", isCompleted: false },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const addItem = (title: string) => {
    setList([
      ...list,
      {
        title: title,
        isCompleted: false,
      },
    ]);
  };
  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };
  const handleStatusChange = (index: number) => {
    const temp = list.map((item, itemI) =>
      itemI !== index
        ? item
        : {
            ...item,
            isCompleted: !item.isCompleted,
          }
    );
    setList(temp);
  };
  return (
    <NativeBaseProvider>
    <Center flex={1} safeAreaTop={10}>
    <VStack space={4} flex={1} w="90%">
      <Heading color="pink.400">Todo App</Heading>
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
            mr={1}/>

        }
        onChangeText={(v) => setInputValue(v)}
        value={inputValue}
        placeholder="Add Item"
      />
      <VStack>
        {list.map((item, itemI) => (
          <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            key={item.title + itemI.toString()}
          >
            <Checkbox
              colorScheme="pink"
              isChecked={item.isCompleted}
              onChange={() => handleStatusChange(itemI)}
              value={item.title}
              accessibilityLabel="Todoが完了したかのチェックボックス"
            >
              <Text mx={2} strikeThrough={item.isCompleted}>
                {item.title}
              </Text>
            </Checkbox>
            <IconButton
              colorScheme="pink"
              icon={<Icon as={FontAwesome5} name="trash" size={5} />}
              onPress={() => handleDelete(itemI)}
            />
          </HStack>
        ))}
      </VStack>
    </VStack>
    </Center>
   </NativeBaseProvider>
  );
}
