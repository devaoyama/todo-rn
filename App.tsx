import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { NativeBaseProvider } from "native-base";
import Screens from "./screens/index";
import Loading from "./components/Loading";

function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <Suspense fallback={<Loading />}>
          <Screens />
        </Suspense>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

export default App;
