import React, { useEffect } from 'react';
import { Loading } from '@kubed/components';

function Mail(): JSX.Element {
  const isLoading = true;

  useEffect(() => {
    console.log('should fetch data');
  }, []);

  if (isLoading) {
    return <Loading style={{ marginLeft: '50%', transform: 'translateX(-50%)' }} />;
  }

  return (
    <>
      <div>Email</div>
    </>
  );
}

export default Mail;
