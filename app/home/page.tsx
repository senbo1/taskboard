import { FC } from 'react';

import Board from './Board';

type pageProps = {};

const page: FC<pageProps> = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default page;
