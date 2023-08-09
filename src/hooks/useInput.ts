import { useState } from 'react';

const useInput = () => {
  // state
  const [value, setValue] = useState<string>('');
  // handler
  const handler = (value: string) => setValue(value);
  // reset
  const reset = () => setValue('');

  return [value, handler, reset];
};

export default useInput;
