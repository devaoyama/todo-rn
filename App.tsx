import React from "react";
import { RecoilRoot } from "recoil";
import { NativeBaseProvider } from "native-base";
import Screens from "./screens/index";

function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <Screens />
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

export default App;
