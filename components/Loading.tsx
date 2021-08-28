import React, { FC } from 'react';
import { Center, Spinner } from 'native-base';

type Props = {
  accessibilityLabel?: string;
}

const Loading: FC<Props> = ({ accessibilityLabel }) => {
  return (
    <Center flex={1}>
      <Spinner accessibilityLabel={accessibilityLabel || 'Loading'} />
    </Center>
  )
};

export default Loading;
