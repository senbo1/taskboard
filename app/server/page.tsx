import { FC } from 'react';
import { getAuth } from '../api/auth/[...nextauth]/options';

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await getAuth();
  return <div>{JSON.stringify(session)}</div>;
};

export default page;
