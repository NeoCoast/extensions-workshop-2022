import React from 'react';
import { SWRConfig } from 'swr';

import fetcher from '../swr/fetcher';
import Avatar, { AvatarVariant } from '../components/avatar';
import Button, { ButtonVariant } from '../components/button';
import FileInput from '../components/inputs/file';
import Input from '../components/inputs/input';
import Spinner from '../components/spinner';

const App = () => {
  const [file, setFile] = React.useState(null);

  return (
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-1 items-center justify-center h-full flex-col">

        <Avatar src="https://rb.gy/e5sqmc" />
        <Avatar size={AvatarVariant.XS} src="https://rb.gy/1pfivg" />
        <Button>Primary</Button>
        <Button variant={ButtonVariant.Secondary}>Secondary</Button>
        <Button variant={ButtonVariant.Clear}>Clear</Button>
        <FileInput
          onChange={setFile}
          onDelete={() => setFile(null)}
          value={file}
        />
        <Input />
        <Spinner />
      </div>
    </SWRConfig>
  );
};

export default App;
